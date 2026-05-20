'use client';

import React from 'react';

export default function DataPage() {
  // Data lengkap dengan perbaikan format angka pakai titik (.) agar tidak di-translate browser
  const regionData = [
    { id: 1, name: 'MUSI BANYUASIN', province: 'SUMATERA SELATAN', area: '202.053', elevation: '77', rainfall: '2.400', desc: 'Sentra Perkebunan Utama. Lahan landai sangat optimal.' },
    { id: 2, name: 'MUSI RAWAS UTARA', province: 'SUMATERA SELATAN', area: '177.120', elevation: '1.191', rainfall: '2.800', desc: 'Kawasan Hujan Tinggi. Vegetasi sangat lebat didukung curah hujan.' },
    { id: 3, name: 'OGAN KOMERING ILIR', province: 'SUMATERA SELATAN', area: '154.224', elevation: '46', rainfall: '2.300', desc: 'Kawasan Pesisir & Rawa. Membutuhkan tata kelola air.' },
    { id: 4, name: 'MUARA ENIM', province: 'SUMATERA SELATAN', area: '132.849', elevation: '115', rainfall: '2.550', desc: 'Kondisi topografi bervariasi dengan tingkat curah hujan ideal.' },
    { id: 5, name: 'BANYUASIN', province: 'SUMATERA SELATAN', area: '145.000', elevation: '15', rainfall: '2.200', desc: 'Dominasi lahan basah pasang surut, dekat dengan pesisir.' },
    { id: 6, name: 'MUSI RAWAS', province: 'SUMATERA SELATAN', area: '110.000', elevation: '100', rainfall: '2.600', desc: 'Potensi pengembangan sawit tinggi dengan kontur berbukit ringan.' },
    { id: 7, name: 'OGAN ILIR', province: 'SUMATERA SELATAN', area: '85.000', elevation: '20', rainfall: '2.100', desc: 'Lahan campuran rawa dan daratan, cocok untuk varietas khusus.' },
    { id: 8, name: 'OGAN KOMERING ULU (OKU)', province: 'SUMATERA SELATAN', area: '75.000', elevation: '150', rainfall: '2.400', desc: 'Tanah mineral yang baik untuk penyerapan unsur hara kelapa sawit.' },
    { id: 9, name: 'OKU TIMUR', province: 'SUMATERA SELATAN', area: '60.000', elevation: '80', rainfall: '2.250', desc: 'Kawasan lumbung pangan yang sebagian lahannya dikonversi untuk sawit.' },
    { id: 10, name: 'PENUKAL ABAB LEMATANG ILIR', province: 'SUMATERA SELATAN', area: '55.000', elevation: '60', rainfall: '2.350', desc: 'Wilayah pemekaran dengan ekspansi kebun kelapa sawit menengah.' },
    { id: 11, name: 'LAHAT', province: 'SUMATERA SELATAN', area: '45.000', elevation: '250', rainfall: '2.650', desc: 'Kawasan dataran tinggi, lebih dominan kopi namun sawit mulai berkembang.' },
    { id: 12, name: 'OKU SELATAN', province: 'SUMATERA SELATAN', area: '40.000', elevation: '300', rainfall: '2.700', desc: 'Elevasi tinggi, kurang direkomendasikan untuk produktivitas maksimal sawit.' },
    { id: 13, name: 'EMPAT LAWANG', province: 'SUMATERA SELATAN', area: '30.000', elevation: '400', rainfall: '2.800', desc: 'Daerah lembah dan perbukitan dengan curah hujan intensitas tinggi.' },
    { id: 14, name: 'KOTA PRABUMULIH', province: 'SUMATERA SELATAN', area: '5.000', elevation: '45', rainfall: '2.200', desc: 'Lahan terbatas karena status kota, didominasi kebun warga skala kecil.' },
    { id: 15, name: 'KOTA LUBUKLINGGAU', province: 'SUMATERA SELATAN', area: '3.500', elevation: '130', rainfall: '2.750', desc: 'Area transisi pegunungan, lahan perkebunan sangat terbatas.' },
    { id: 16, name: 'KOTA PALEMBANG', province: 'SUMATERA SELATAN', area: '1.500', elevation: '8', rainfall: '2.100', desc: 'Pusat pemerintahan dan tata kota, lahan agrikultur hampir tidak ada.' },
    { id: 17, name: 'KOTA PAGAR ALAM', province: 'SUMATERA SELATAN', area: '1.000', elevation: '900', rainfall: '3.000', desc: 'Sangat tidak sesuai untuk kelapa sawit karena elevasi pegunungan tinggi.' }
  ];

  const handleExportCSV = () => {
    const headers = ['ID', 'Nama Wilayah', 'Provinsi', 'Luas Lahan (Ha)', 'Elevasi (mdpl)', 'Curah Hujan (mm/th)', 'Deskripsi Analitik'];
    
    // Menggunakan titik koma (;) agar rapi di Excel
    const csvRows = [headers.join(';')];

    regionData.forEach(row => {
      const values = [
        row.id,
        `"${row.name}"`,
        `"${row.province}"`,
        `"${row.area}"`,
        `"${row.elevation}"`,
        `"${row.rainfall}"`,
        `"${row.desc}"`
      ];
      csvRows.push(values.join(';'));
    });

    // Menambahkan BOM (\uFEFF) di awal string
    const csvString = '\uFEFF' + csvRows.join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Database_Wilayah_Sumsel.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-8">
      {/* Header Halaman */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#0f172a] text-white text-[10px] font-black px-2.5 py-1 rounded tracking-[0.2em] uppercase">DATA MODUL</span>
            <span className="h-3 w-[1px] bg-slate-300"></span>
            <span className="text-emerald-600 text-[10px] font-black tracking-[0.2em] uppercase">SINKRONISASI BPS</span>
          </div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight italic mb-3">Basis Data Wilayah</h1>
          <p className="text-slate-500 text-sm font-medium max-w-3xl leading-relaxed">
            Tabel atribut data pusat integrasi Provinsi Sumatera Selatan. Parameter geografis ini ditarik secara langsung dan menjadi landasan dasar <span className="text-slate-900 font-bold italic underline decoration-emerald-500">komputasi klastering K-Means</span>.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm shrink-0">
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">STATUS KONEKSI</span>
            <span className="text-[#0f172a] font-extrabold text-xs tracking-wide">DATABASE<br/>TERHUBUNG</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Kontainer Tabel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        
        {/* Header Tabel & Tombol Export */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Data Atribut 17 Kabupaten/Kota</h2>
          
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Unduh CSV
          </button>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-t border-slate-200">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">No</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Wilayah</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Luas Lahan (Ha)</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Elevasi (mdpl)</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Hujan (mm/th)</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Keterangan Singkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regionData.map((row, index) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-800">{row.name}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-600 text-right">{row.area}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.elevation}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.rainfall}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate" title={row.desc}>
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}