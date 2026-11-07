import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  X,
  ExternalLink,
  Loader2,
  ShieldCheck,
  CreditCard,
  Mail,
} from 'lucide-react';
import { API_BASE_URL, DASHBOARD_URL as DEFAULT_DASHBOARD_URL } from '../config/env';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTarget?: number;
  initialPlan?: string;
}

interface CheckoutData {
  order_id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  status: string;
  payment_url: string;
  snap_token?: string;
  midtrans_client_key?: string;
  is_production?: boolean;
  is_simulator_mode: boolean;
  expires_at: string;
}

interface OrderStatusData {
  order_id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  status: string;
  payment_url: string;
  snap_token?: string;
  payment_type?: string;
  is_simulator_mode: boolean;
  paid_at?: string;
  temporary_password?: string;
  dashboard_url: string;
}

declare global {
  interface Window {
    snap?: {
      pay: (
        snapToken: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

/**
 * Memuat script Midtrans Snap (`snap.js`) secara dinamis sesuai mode Sandbox/Production.
 */
function ensureMidtransSnapScript(clientKey: string, isProduction: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.snap) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('midtrans-snap-script') as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(Boolean(window.snap)));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'midtrans-snap-script';
    script.src = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    script.onload = () => resolve(Boolean(window.snap));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<'checkout' | 'waiting_payment' | 'paid'>('checkout');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatusData | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const checkOrderStatusImmediate = useCallback(async (invoiceNumber: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/payments/orders/${encodeURIComponent(invoiceNumber)}/status`
      );
      if (!res.ok) return false;
      const json = await res.json();
      const data: OrderStatusData | undefined = json.data;
      if (data && data.status === 'PAID') {
        setOrderStatus(data);
        setStep('paid');
        return true;
      }
      if (data && (data.status === 'EXPIRED' || data.status === 'FAILED')) {
        setErrorMessage(
          `Sesi pembayaran telah berakhir atau dibatalkan (${data.status}). Silakan buat sesi baru.`
        );
        setStep('checkout');
        return true;
      }
    } catch {
      // Abaikan error jaringan sementara saat polling
    }
    return false;
  }, []);

  // Poll status pembayaran setiap 2.5 detik saat berada di step waiting_payment
  useEffect(() => {
    if (!isOpen || step !== 'waiting_payment' || !checkoutData?.invoice_number) {
      return;
    }

    const pollInterval = setInterval(async () => {
      const done = await checkOrderStatusImmediate(checkoutData.invoice_number);
      if (done) {
        clearInterval(pollInterval);
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [isOpen, step, checkoutData, checkOrderStatusImmediate]);

  if (!isOpen) return null;

  const launchMidtransPayment = async (data: CheckoutData) => {
    // Jika bukan simulator dan tersedia snap_token + midtrans_client_key, gunakan Snap Popup
    if (
      !data.is_simulator_mode &&
      data.snap_token &&
      data.midtrans_client_key
    ) {
      const snapReady = await ensureMidtransSnapScript(
        data.midtrans_client_key,
        Boolean(data.is_production)
      );
      if (snapReady && window.snap) {
        window.snap.pay(data.snap_token, {
          onSuccess: () => {
            void checkOrderStatusImmediate(data.invoice_number);
          },
          onPending: () => {
            void checkOrderStatusImmediate(data.invoice_number);
          },
          onError: () => {
            void checkOrderStatusImmediate(data.invoice_number);
          },
          onClose: () => {
            void checkOrderStatusImmediate(data.invoice_number);
          },
        });
        return;
      }
    }

    // Fallback ke Redirect URL Midtrans Snap atau Simulator lokal di tab baru
    window.open(data.payment_url, '_blank', 'noopener,noreferrer');
  };

  const handleCreateCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          customer_phone: customerPhone.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.data) {
        const detailMsg =
          Array.isArray(json.errors) && json.errors.length > 0
            ? json.errors.join(', ')
            : json.message || 'Gagal membuat sesi pembayaran';
        setErrorMessage(detailMsg);
        setIsSubmitting(false);
        return;
      }

      const data: CheckoutData = json.data;
      setCheckoutData(data);
      setStep('waiting_payment');
      setIsSubmitting(false);

      await launchMidtransPayment(data);
    } catch {
      setErrorMessage(
        'Tidak dapat terhubung ke server pembayaran. Pastikan backend YukPlanning sedang berjalan.'
      );
      setIsSubmitting(false);
    }
  };

  const handleCopyPassword = () => {
    if (!orderStatus?.temporary_password) return;
    navigator.clipboard?.writeText(orderStatus.temporary_password);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2500);
  };

  const handleResetAndClose = () => {
    setStep('checkout');
    setErrorMessage('');
    onClose();
  };

  const rawDashboardUrl = (orderStatus?.dashboard_url || DEFAULT_DASHBOARD_URL).replace(/\/$/, '');
  const dashboardLoginUrl = rawDashboardUrl.includes('#')
    ? `${rawDashboardUrl}${rawDashboardUrl.includes('?') ? '&' : '?'}email=${encodeURIComponent(customerEmail.trim())}`
    : `${rawDashboardUrl}/#/login?email=${encodeURIComponent(customerEmail.trim())}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#EEDBD7] shadow-2xl overflow-hidden relative animate-fade-in max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FAF4F2] text-[#7D5A61] hover:text-[#3B151C] flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'checkout' && (
          <div className="p-5 sm:p-8 overflow-y-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#F5CCD3] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Checkout Akses Selamanya</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3B151C] mb-1">
              Dapatkan Akun YukPlanning Anda
            </h3>
            <p className="text-xs text-[#7A5A62] mb-5">
              Isi data Anda di bawah ini. Setelah pembayaran <strong>Rp 40.000</strong> selesai, sistem otomatis membuatkan akun dan mengirimkannya ke email Anda.
            </p>

            {/* Ringkasan Paket */}
            <div className="p-4 bg-[#FAF5F2] rounded-2xl border border-[#EFE0DB] mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#3B151C]">
                  Paket Hari Bahagia (Lifetime Access)
                </div>
                <div className="text-[11px] text-[#7A5A62]">
                  Sekali bayar untuk selamanya • Tanpa biaya bulanan
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-serif font-bold text-[#6A2330]">
                  Rp 40.000
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FFF0F2] border border-[#F5CCD3] text-xs text-[#A63A4B] font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Nama Lengkap Anda
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Andi Pratama"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Alamat Email Aktif (Untuk Pengiriman Akun)
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                />
                <p className="text-[11px] text-[#9A7A81] mt-1">
                  Email ini akan menjadi username login Anda beserta password sementara.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C222D] mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  required
                  minLength={8}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DEC2C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#873646]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-[#6A2330] hover:bg-[#541B26] disabled:opacity-60 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyiapkan Sesi Pembayaran Midtrans...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Lanjut Bayar Rp 40.000 via Midtrans</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C6B72] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4F7A43]" />
                <span>Mendukung QRIS, Virtual Account BCA/Mandiri/BNI/BRI, & E-Wallet via Midtrans</span>
              </div>
            </form>
          </div>
        )}

        {step === 'waiting_payment' && checkoutData && (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F2] text-[#A63A4B] flex items-center justify-center mx-auto mb-4 border border-[#F5CCD3]">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E5564] mb-1">
              Menunggu Pembayaran • {checkoutData.invoice_number}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3B151C] mb-2">
              Selesaikan Pembayaran Rp 40.000
            </h3>
            <p className="text-xs text-[#7A5A62] mb-6">
              Selesaikan pembayaran pada jendela Midtrans Snap. Halaman ini akan otomatis diperbarui begitu pembayaran Anda berhasil diverifikasi.
            </p>

            <div className="p-4 bg-[#FAF5F2] rounded-2xl border border-[#EFE0DB] mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#7A5A62]">Nomor Invoice</span>
                <strong className="text-[#3B151C] font-mono">{checkoutData.invoice_number}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A5A62]">Email Penerima Akun</span>
                <strong className="text-[#3B151C]">{checkoutData.customer_email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A5A62]">Nominal Tagihan</span>
                <strong className="text-[#6A2330]">Rp 40.000</strong>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => launchMidtransPayment(checkoutData)}
                className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Buka Kembali Pembayaran Midtrans Snap</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-2.5 text-xs font-semibold text-[#7A5A62] hover:text-[#3B151C] cursor-pointer"
              >
                ← Ubah Email / Data Pemesan
              </button>
            </div>
          </div>
        )}

        {step === 'paid' && orderStatus && (
          <div className="p-6 sm:p-8 text-center overflow-y-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF5E9] text-[#2A7545] flex items-center justify-center mx-auto mb-4 border border-[#C5E3BF]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-[#2A7545] mb-1">
              PEMBAYARAN LUNAS • AKUN AKTIF
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#3B151C] mb-2">
              Selamat Datang, {orderStatus.customer_name}! 💍
            </h3>
            <p className="text-xs text-[#7A5A62] mb-5">
              Kami telah mengirimkan detail akun ke email <strong>{orderStatus.customer_email}</strong>. Anda juga dapat langsung menyalin password sementara di bawah ini untuk login sekarang:
            </p>

            <div className="p-4 bg-[#FAF5F2] rounded-2xl border border-[#EFE0DB] mb-6 text-left space-y-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6B72]">
                  Email Login
                </div>
                <div className="text-sm font-bold text-[#3B151C] flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#6A2330]" />
                  <span>{orderStatus.customer_email}</span>
                </div>
              </div>

              {orderStatus.temporary_password && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6B72] mb-1">
                    Password Sementara (Salin untuk Login Pertama)
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={orderStatus.temporary_password}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#E0CBC6] rounded-xl font-mono font-bold text-[#6A2330]"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedPassword ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedPassword ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-[#7A5A62] pt-1">
                🔒 Saat pertama kali login di Dashboard, Anda akan diminta mengganti password sementara ini menjadi password pribadi sebelum mengisi Setup Wizard pernikahan.
              </p>
            </div>

            <a
              href={dashboardLoginUrl}
              className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-[#6A2330] hover:bg-[#541B26] rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              <span>Masuk ke Dashboard Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
