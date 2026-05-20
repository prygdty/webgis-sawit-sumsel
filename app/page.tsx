'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      
      {/* Hero Section (Banner Atas) */}
      {/* Catatan: Ganti 'url(/path/to/ampera.jpg)' dengan path gambar jembatan amperamu yang asli di folder public */}
      <div 
        className="relative h-[400px] w-full bg-slate-900 flex flex-col justify-end p-12 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 100%), url('/ampera.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
            Bentang Alam <br />
            <span className="text-emerald-400">Sumatera Selatan</span>
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl border-l-4 border-emerald-500 pl-4">
            Strategi provinsi penggerak perekonomian Sumatera. Episentrum komoditas emas hijau penopang devisa negara berbasis agroklimatologi presisi.
          </p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Narasi Profil Geografis (Lebih Panjang & Informatif) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-2.5 bg-emerald-500 rounded-full"></div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Profil Geografis & Agroklimatologi</h2>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-5 text-justify leading-relaxed">
              <p>
                <strong className="text-slate-800">Provinsi Sumatera Selatan</strong>, yang secara historis dikenal sebagai Bumi Sriwijaya, merupakan salah satu wilayah paling strategis di Nusantara dengan luas total mencapai 91.592 kilometer persegi. Secara administratif, provinsi ini terbagi ke dalam 17 Kabupaten/Kota yang masing-masing memiliki karakteristik bentang alam yang unik. Topografi wilayah ini sangat bervariasi, membentang dari dataran rendah dan rawa pasang surut di pesisir timur (seperti Kabupaten Banyuasin dan Ogan Komering Ilir), hingga dataran tinggi dan gugusan Pegunungan Bukit Barisan di ufuk barat (seperti Kota Pagar Alam dan Lahat).
              </p>
              <p>
                <strong>Dinamika Elevasi dan Kesesuaian Lahan:</strong> Variasi ketinggian permukaan tanah (elevasi) di Sumatera Selatan bergerak dari 0 meter di atas permukaan laut (mdpl) hingga melampaui 3.000 mdpl. Bagi sektor agrikultur kelapa sawit, topografi dataran rendah hingga menengah (0 - 500 mdpl) dengan kemiringan lereng yang landai adalah ekosistem paling ideal. Kondisi fisik inilah yang menjadikan sebagian besar kabupaten di Sumatera Selatan sangat kompatibel untuk pengembangan perkebunan berskala masif, karena memudahkan mekanisasi pertanian dan meminimalisir risiko erosi hara tanah.
              </p>
              <p>
                <strong>Klimatologi Tropis Basah:</strong> Sebagai wilayah yang dilintasi garis ekuator, Sumatera Selatan memiliki iklim tropis basah dengan penyinaran matahari yang stabil sepanjang tahun. Rata-rata curah hujan tahunan berada pada rentang ekuilibrium yang sangat dibutuhkan oleh tanaman kelapa sawit, yakni antara 2.000 hingga 3.000 mm per tahun, tanpa adanya defisit air (kemarau ekstrem) yang berkepanjangan. Kombinasi curah hujan intensif dan kelembapan tinggi ini memastikan proses pembentukan Tandan Buah Segar (TBS) dan rendemen minyak kelapa sawit (CPO) mencapai titik optimalitas biologisnya.
              </p>
            </div>

            {/* BOX SUMBER DATA BPS */}
            <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-600"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Validasi Referensi Data (BPS Sumsel)</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Seluruh parameter spasial dan atribut data yang diproses di dalam *engine* Geo Sawit disinkronkan secara langsung dari basis data resmi Badan Pusat Statistik (BPS) Provinsi Sumatera Selatan:
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="https://sumsel.bps.go.id/id/statistics-table/2/NDE0IzI=/luas-tanaman-perkebunan.html" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-sm transition-all group">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <span className="block text-sm font-bold text-slate-700 group-hover:text-emerald-700">Luas Lahan Tanaman Perkebunan (Sawit)</span>
                      <span className="text-[10px] text-slate-400 break-all">sumsel.bps.go.id/.../luas-tanaman-perkebunan.html</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://sumsel.bps.go.id/id/statistics-table/2/MjIwIzI=/curah-hujan.html" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-sm transition-all group">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <span className="block text-sm font-bold text-slate-700 group-hover:text-emerald-700">Data Agroklimatologi: Curah Hujan</span>
                      <span className="text-[10px] text-slate-400 break-all">sumsel.bps.go.id/.../curah-hujan.html</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://sumsel.bps.go.id/id/statistics-table/2/ODIjMg==/ketinggian-wilayah-.html" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-sm transition-all group">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <span className="block text-sm font-bold text-slate-700 group-hover:text-emerald-700">Data Topografi: Ketinggian Wilayah (Elevasi)</span>
                      <span className="text-[10px] text-slate-400 break-all">sumsel.bps.go.id/.../ketinggian-wilayah-.html</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Kolom Kanan: Highlight & Metrik Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Card Quote */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200">
              <svg className="w-10 h-10 text-emerald-300/50 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L16.418 12.592C16.892 10.978 17 9.805 17 9c0-1.748-.568-3.09-1.705-4.025C14.158 4.039 12.52 3.565 10.383 3.565v3.136c1.171 0 2.057.24 2.658.72C13.643 7.9 13.943 8.653 13.943 9.68c0 .247-.021.564-.063.951h-3.481l-1.921 10.369h5.539zm-10.082 0L6.336 12.592C6.81 10.978 6.918 9.805 6.918 9c0-1.748-.568-3.09-1.705-4.025C4.076 4.039 2.438 3.565.301 3.565v3.136c1.171 0 2.057.24 2.658.72.602.479.902 1.232.902 2.259 0 .247-.021.564-.063.951H.317L-1.604 21h5.539z"/></svg>
              <h3 className="text-xl font-black mb-3">Signifikansi Sawit</h3>
              <p className="text-emerald-50 font-medium leading-relaxed italic text-sm">
                "Kelapa sawit bukan sekadar tanaman, melainkan tulang punggung ekonomi Sumatera Selatan yang menyerap ribuan tenaga kerja dan menyuntikkan devisa negara berskala masif melalui ekspor CPO ke pasar global."
              </p>
            </div>

            {/* Grid Metrik Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="block text-3xl font-black text-slate-800 mb-1">17</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah ADM</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="block text-3xl font-black text-slate-800 mb-1">1.2<span className="text-lg">Jt</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hektar Lahan</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="block text-3xl font-black text-slate-800 mb-1">2.5<span className="text-lg">k</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">mm Hujan/Th</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="block text-3xl font-black text-slate-800 mb-1">Variatif</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Elevasi (Mdpl)</span>
              </div>
            </div>

            {/* Tombol ke Analisis */}
            <div className="pt-4">
              <Link href="/peta" className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white p-4 rounded-2xl hover:bg-emerald-600 transition-colors shadow-lg group">
                <span className="text-xs font-black uppercase tracking-widest">Akses Analisis Spasial</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}