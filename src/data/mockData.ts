import { DepositItem, TaskItem, VendorItem } from '../types';

export const INITIAL_DEPOSITS: DepositItem[] = [
  {
    id: 'dep-1',
    title: 'Gaji Bulanan & Alokasi Nabung',
    contributor: 'pria',
    contributorName: 'amba (Pria)',
    date: '8 Okt 2026',
    amount: 25000000,
  },
  {
    id: 'dep-2',
    title: 'Patungan Hadiah Tunangan & Rutin',
    contributor: 'bersama',
    contributorName: 'Keduanya (Bersama)',
    date: '3 Okt 2026',
    amount: 16000000,
  },
  {
    id: 'dep-3',
    title: 'Hasil Bonus & Tabungan Pribadi',
    contributor: 'wanita',
    contributorName: 'ciimut (Wanita)',
    date: '15 Sep 2026',
    amount: 17500000,
  },
  {
    id: 'dep-4',
    title: 'Setoran Awal Tabungan Bersama',
    contributor: 'pria',
    contributorName: 'amba (Pria)',
    date: '12 Ags 2026',
    amount: 20000000,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Diskusi mahar dengan pasangan & keluarga',
    category: 'Akad & Adat',
    deadline: '4 Nov 2026 (H-3 Bulan)',
    isCompleted: false,
    priority: 'Tinggi',
  },
  {
    id: 'task-2',
    title: 'Fitting pertama kebaya akad & jas pengantin',
    category: 'Busana & Penampilan',
    deadline: '14 Nov 2026 (H-3 Bulan)',
    isCompleted: false,
    priority: 'Tinggi',
  },
  {
    id: 'task-3',
    title: 'Pemeriksaan kesehatan pranikah (MCU) puskesmas',
    category: 'Administrasi KUA',
    deadline: '14 Nov 2026 (H-3 Bulan)',
    isCompleted: false,
    priority: 'Tinggi',
  },
  {
    id: 'task-4',
    title: 'Koordinasi perizinan lingkungan & keamanan gedung',
    category: 'Venue & Logistik',
    deadline: '20 Nov 2026',
    isCompleted: false,
    priority: 'Sedang',
  },
  {
    id: 'task-5',
    title: 'Survey 3 lokasi venue potensial',
    category: 'Venue & Akad',
    deadline: '15 Jul 2026',
    isCompleted: true,
    priority: 'Tinggi',
  },
  {
    id: 'task-6',
    title: 'Booking Sasana Kriya TMII & Pembayaran DP 30%',
    category: 'Venue & Akad',
    deadline: '1 Agu 2026',
    isCompleted: true,
    priority: 'Tinggi',
  },
  {
    id: 'task-7',
    title: 'Food testing & pemilihan menu katering 800 pax',
    category: 'Vendor Utama',
    deadline: '25 Agu 2026',
    isCompleted: true,
    priority: 'Tinggi',
  },
  {
    id: 'task-8',
    title: 'Deal fotografer & videografer cinematic',
    category: 'Vendor Utama',
    deadline: '10 Sep 2026',
    isCompleted: true,
    priority: 'Sedang',
  },
];

export const INITIAL_VENDORS: VendorItem[] = [
  {
    id: 'ven-1',
    name: 'Sasana Kriya Grand Ballroom',
    category: 'Gedung & Venue',
    status: 'Deal',
    price: 32000000,
    paidAmount: 16000000,
    contact: '0812-9988-1234',
  },
  {
    id: 'ven-2',
    name: 'Puri Catering Nusantara',
    category: 'Katering & Prasmanan',
    status: 'Deal',
    price: 46000000,
    paidAmount: 20000000,
    contact: '0813-2233-4455',
  },
  {
    id: 'ven-3',
    name: 'Kalam Visual Cinematic',
    category: 'Foto & Video',
    status: 'Deal',
    price: 14500000,
    paidAmount: 7000000,
    contact: '0811-7788-9900',
  },
  {
    id: 'ven-4',
    name: 'Anindya MUA & Kebaya Traditional',
    category: 'Busana & Tata Rias',
    status: 'Deal',
    price: 12000000,
    paidAmount: 6000000,
    contact: '0857-1122-3344',
  },
  {
    id: 'ven-5',
    name: 'Aroma Floral Decor',
    category: 'Dekorasi Pelaminan',
    status: 'Negosiasi',
    price: 15500000,
    paidAmount: 0,
    contact: '0819-3344-5566',
  },
];

export const COUPLE_TESTIMONIALS = [
  {
    quote: 'Dulu sebelum pakai YukPlanner, kami sering berdebat tiap kali bahas alokasi bujet katering dan DP gedung. Dengan fitur tabungan berdua 50:50 dan dashboard real-time, kami tahu persis kapan harus setor tanpa rasa sungkan. Kami berhasil hemat Rp 21 Juta!',
    coupleNames: 'Raditya & Tania Maharani',
    location: 'Jakarta Selatan',
    weddingDate: 'Menikah 14 September 2026',
    savingsOutcome: 'Hemat Rp 21.400.000 dari estimasi awal',
    avatarText: 'R & T',
  },
  {
    quote: 'Fitur checklist persiapan dengan prioritas tinggi sangat menyelamatkan. Dari MCU puskesmas sampai berkas numpang nikah KUA selesai tepat waktu tanpa panik di bulan-bulan akhir. Pelacakan kuota kateringnya juga membuat bujet F&B kami tepat sasaran.',
    coupleNames: 'Dimas Wicaksono & Nadia Putri',
    location: 'Surabaya',
    weddingDate: 'Menikah 28 Agustus 2026',
    savingsOutcome: '100% Target Tabungan Tercapai H-2 Bulan',
    avatarText: 'D & N',
  },
  {
    quote: 'Suka banget dengan visualnya yang lembut dan romantis tapi fiturnya super profesional. Riwayat setoran transparan bikin calon suami dan saya saling mengapresiasi usaha masing-masing. Hari akad kami berjalan khidmat dan tanpa hutang!',
    coupleNames: 'Farhan & Amanda Lestari',
    location: 'Bandung',
    weddingDate: 'Menikah 18 Oktober 2026',
    savingsOutcome: 'Selesai tanpa pinjaman, surplus Rp 8 Juta',
    avatarText: 'F & A',
  },
];

export const FAQS = [
  {
    question: 'Bagaimana cara calon pengantin pria dan wanita menggunakan YukPlanner bersama?',
    answer: 'Cukup satu orang yang membuat rencana pernikahan, lalu bagikan tautan undangan khusus ke pasangan. Keduanya akan memiliki akses masuk mandiri dengan sinkronisasi real-time. Setiap penambahan setoran tabungan, pembayaran vendor, atau checklist tugas akan langsung terupdate di layar masing-masing.',
  },
  {
    question: 'Apakah data tabungan dan nominal finansial kami aman dan terjaga kerahasiaannya?',
    answer: 'Sangat aman. Privasi data pernikahan Anda adalah prioritas kami. Semua data finansial dienkripsi standar perbankan dan hanya dapat dilihat oleh Anda dan pasangan Anda yang terdaftar pada tautan pernikahan tersebut.',
  },
  {
    question: 'Apakah alokasi anggaran bisa disesuaikan untuk konsep Intimate Wedding atau Adat?',
    answer: 'Tentu bisa! YukPlanner menyediakan template alokasi bujet yang fleksibel. Anda bebas menambah, mengurangi kategori, atau mengubah persentase pagu anggaran sesuai kebutuhan acara adat besar, pesta kebun intim, maupun akad sederhana.',
  },
  {
    question: 'Apakah data anggaran dan vendor bisa diekspor ke format PDF atau Excel?',
    answer: 'Ya, Anda dapat mengunduh ringkasan buku rencana pernikahan lengkap dalam format PDF rapi atau file Excel yang siap dibagikan kepada orang tua, keluarga besar, maupun tim Wedding Organizer (WO) Anda.',
  },
  {
    question: 'Apakah ada biaya langganan bulanan setelah hari pernikahan kami selesai?',
    answer: 'Tidak ada biaya langganan berulang yang menjebak. Paket "Hari Bahagia" kami menggunakan skema One-Time Payment (sekali bayar) yang aktif selama seluruh periode persiapan sampai hari H Anda tiba, plus akses arsip selamanya.',
  },
];
