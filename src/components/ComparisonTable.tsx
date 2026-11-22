import React from 'react';
import { Check, X, Sparkles, Heart } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    {
      feature: 'Tampilan Elegan & Suasana Romantis Pernikahan',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Menemani proses menuju hari H dengan suasana penuh cinta, bukan seperti tugas kantor.',
    },
    {
      feature: 'Akses Berdua Real-Time (Akun Pasangan Tersinkron)',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Setiap setoran tabungan & checklist tugas langsung ter-update di smartphone pasangan.',
    },
    {
      feature: 'Rekomendasi Setoran Nabung Otomatis Berdasarkan Sisa Bulan',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Otomatis menghitung berapa nominal yang harus disetor per orang tanpa rumus rumit.',
    },
    {
      feature: 'Vendor Hub & Reminder Jatuh Tempo Termin Pembayaran',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Mencegah denda keterlambatan pelunasan gedung, katering, dan dekorasi.',
    },
    {
      feature: 'Manajemen Kuota Katering & RSVP Tamu (Anti-Mubazir)',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Hitung presisi tamu Hadir, Menunggu, dan Draf agar porsi prasmanan tepat sasaran.',
    },
    {
      feature: '34+ Checklist Terstruktur Timeline KUA & Adat Indonesia',
      yukPlanning: true,
      excel: false,
      manual: false,
      detail: 'Mulai dari MCU pranikah puskesmas hingga gladi resik hari H.',
    },
    {
      feature: 'Sekali Bayar untuk Selamanya (Tanpa Biaya Langganan Bulanan)',
      yukPlanning: true,
      excel: true,
      manual: true,
      detail: 'Investasi sekali Rp 40.000 tanpa tagihan bulanan yang membebani bujet Anda.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF5F2] border-t border-[#EFE2DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5564] bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#F5CCD3] mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Kenapa Bukan Spreadsheet Biasa?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#3B151C] tracking-tight">
            Dibuat Khusus untuk Hubungan yang Harmonis Menjelang Akad
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6E5057]">
            Mempersiapkan pernikahan seharusnya menjadi momen terindah, bukan pemicu pertengkaran karena selisih angka dan catatan berantakan.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-[#EEDBD7] shadow-xs overflow-hidden">
          {/* Mobile swipe helper */}
          <div className="md:hidden px-4 py-2 bg-[#FAF5F2] border-b border-[#EFE0DB] text-[11px] text-[#8C6B72] text-center flex items-center justify-center gap-1.5 font-medium">
            <span>👉 Geser tabel ke samping untuk melihat perbandingan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-[#EFE0DB] bg-[#FDF9F7]">
                  <th className="py-4 sm:py-5 px-4 sm:px-6 font-semibold text-[#3B151C] w-1/2 min-w-[220px]">
                    Fitur & Pengalaman Pengguna
                  </th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 text-center font-bold text-[#5C222D] bg-[#FCEBEF] w-1/6 min-w-[130px] relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#8C3442] text-white text-[9px] uppercase font-bold py-0.5 tracking-wider">
                      Terbaik untuk Capeng
                    </div>
                    <span className="flex items-center justify-center gap-1.5 font-serif text-sm sm:text-base mt-2">
                      <Sparkles className="w-4 h-4 text-[#A63A4B]" />
                      YukPlanning
                    </span>
                  </th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 text-center font-medium text-[#7D5A61] w-1/6 min-w-[110px] text-xs sm:text-sm">
                    Excel / Google Sheets
                  </th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 text-center font-medium text-[#7D5A61] w-1/6 min-w-[110px] text-xs sm:text-sm">
                    Buku Catatan Manual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E5E1]">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FFFDFD] transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6">
                      <div className="font-semibold text-xs sm:text-sm text-[#3B151C]">{row.feature}</div>
                      <div className="text-[11px] sm:text-xs text-[#7A5A62] mt-0.5 leading-snug">{row.detail}</div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-3 sm:px-6 text-center bg-[#FDF5F7]">
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#5C222D] text-white shadow-2xs">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      </span>
                    </td>
                    <td className="py-3.5 sm:py-4 px-3 sm:px-6 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 text-slate-400">
                        {row.excel ? (
                          <Check className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
                        ) : (
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 sm:py-4 px-3 sm:px-6 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 text-slate-400">
                        {row.manual ? (
                          <Check className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
                        ) : (
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
