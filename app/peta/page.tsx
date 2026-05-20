'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Load Map Engine secara dinamis
const MapComponent = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mb-4"></div>
        <p className="text-slate-500 font-black tracking-widest text-[10px] uppercase">Menyinkronkan Data Spasial...</p>
      </div>
    </div>
  )
});

export default function PetaPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>('all');

  // Data untuk Pie Chart
  const chartData = [
    { name: 'Prioritas 1', value: 45, color: '#10b981' }, // emerald-500
    { name: 'Pertumbuhan 2', value: 35, color: '#fbbf24' }, // amber-400
    { name: 'Terbatas 3', value: 20, color: '#f43f5e' }, // rose-500
  ];

  // Fungsi untuk trigger download file GeoJSON
  const handleDownloadGeoJSON = () => {
    const dummyData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            kabupaten: "Data Simulasi - Sumatera Selatan",
            klaster: activeFilter === 'all' ? "Semua Zona" : activeFilter,
            status: "Sistem Tervalidasi"
          },
          geometry: {
            type: "Point",
            coordinates: [104.7458, -2.9909] // Koordinat Palembang
          }
        }
      ]
    };

    const jsonString = JSON.stringify(dummyData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `GeoSawit_Klaster_${activeFilter}.geojson`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-8 bg-slate-50/50 min-h-screen">
      {/* Header Dashboard & Metadata */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded tracking-[0.2em] uppercase">Modul SDSS</span>
            <span className="text-emerald-600 text-[10px] font-black tracking-[0.2em] uppercase border-l border-slate-300 pl-3">Geo Sawit Intelligence</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Pemodelan Kesesuaian Spasial</h1>
          <p className="text-slate-500 mt-3 text-sm font-medium max-w-3xl leading-relaxed">
            Platform analisis tata ruang agroklimatologi kelapa sawit berbasis komputasi <span className="text-slate-800 font-bold italic underline decoration-emerald-500">pembelajaran mesin tanpa pengawasan</span>.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Mesin Algoritma</span>
            <span className="text-slate-800 font-extrabold text-xs tracking-wide">K-MEANS DITERAPKAN</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Grid Utama Dashboard (Peta + Panel Analitik) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[800px]">
        
        {/* Kontainer Peta */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] p-3 shadow-xl border border-slate-200 relative overflow-hidden flex flex-col">
          <div className="absolute top-6 left-6 z-[1000]">
            <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm uppercase tracking-wider">
              Konteks Sumatera Selatan
            </span>
          </div>
          <div className="flex-1 rounded-[1.5rem] overflow-hidden relative">
            <MapComponent />
          </div>
        </div>

        {/* Panel Analitik Kanan */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-1 custom-scrollbar">
          
          {/* Card Agregasi Data */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-200">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 text-center">Agregasi Data</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-2xl font-black text-slate-800 italic">17</span>
                <p className="text-slate-400 text-[8px] font-bold uppercase tracking-tighter mt-1">Unit Administrasi</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-2xl font-black text-slate-800 italic">2.5<span className="text-sm">k</span></span>
                <p className="text-slate-400 text-[8px] font-bold uppercase tracking-tighter mt-1">Prec. mm/Tahun</p>
              </div>
            </div>
          </div>

          {/* Card Logika Klaster & Chart */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-200 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Logika Klaster</h3>
              <span className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded">Analisis Langsung</span>
            </div>

            {/* Pie Chart Interaktif */}
            <div className="h-40 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}% Wilayah`, 'Distribusi']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tombol Legenda */}
            <div className="space-y-3">
              {[
                { id: 'emas', label: 'Zona Prioritas 1', color: 'bg-emerald-500', pct: '45%' },
                { id: 'berkembang', label: 'Zona Pertumbuhan 2', color: 'bg-amber-400', pct: '35%' },
                { id: 'terbatas', label: 'Zona Terbatas 3', color: 'bg-rose-500', pct: '20%' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${activeFilter === item.id || activeFilter === 'all' ? 'border-slate-200 bg-white shadow-md' : 'opacity-30 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`}></div>
                      <span className="font-black text-slate-800 text-[11px] uppercase tracking-wider">{item.label}</span>
                    </div>
                    <span className="font-black text-slate-900 text-xs">{item.pct}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tombol Action Bawah */}
            <div className="mt-auto pt-6 space-y-3">
              {activeFilter !== 'all' && (
                <button 
                  onClick={() => setActiveFilter('all')}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 active:scale-95 transition-all"
                >
                  Reset Filter Klaster
                </button>
              )}
              
              <button 
                onClick={handleDownloadGeoJSON}
                className="w-full py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-emerald-100 hover:shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Unduh GeoJSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================================= */}
      {/* PANEL BAWAH: LEGENDA & CENTROID SPASIAL (Ditambahkan di bawah Grid Utama) */}
      {/* ========================================================================================= */}
      
      <div className="mt-8 bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
        {/* Header Panel Centroid */}
        <div className="bg-slate-50 p-6 border-b border-slate-200">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
            Legenda Visual & Analisis Karakteristik Wilayah (Centroid K-Means)
          </h3>
          <p className="text-slate-500 text-xs mt-2 font-medium">
            Matriks di bawah ini merepresentasikan nilai rata-rata (titik pusat spasial) dari variabel fisik lingkungan untuk masing-masing zona klaster di Provinsi Sumatra Selatan.
          </p>
        </div>

        {/* Tabel Centroid */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-white border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px]">Simbol / Warna Peta</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px]">Tingkat Kesesuaian Lahan</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-right">Rata-rata Elevasi</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-right">Rata-rata Luas Lahan</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-right">Rata-rata Curah Hujan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* KLASTER 1 */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-emerald-500 shadow-sm flex-shrink-0"></span>
                  <span className="font-bold text-xs text-slate-800 uppercase">Cluster 1</span>
                </td>
                <td className="py-4 px-6 font-bold text-emerald-600">
                  Sangat Layak (Prioritas)
                </td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">32.45 mdpl</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">142,500.20 Ha</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">2,650.40 mm</td>
              </tr>

              {/* KLASTER 2 */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-amber-400 shadow-sm flex-shrink-0"></span>
                  <span className="font-bold text-xs text-slate-800 uppercase">Cluster 2</span>
                </td>
                <td className="py-4 px-6 font-bold text-amber-600">
                  Cukup Layak (Pertumbuhan)
                </td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">124.10 mdpl</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">64,320.85 Ha</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">2,100.15 mm</td>
              </tr>

              {/* KLASTER 3 */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-rose-500 shadow-sm flex-shrink-0"></span>
                  <span className="font-bold text-xs text-slate-800 uppercase">Cluster 3</span>
                </td>
                <td className="py-4 px-6 font-bold text-rose-600">
                  Kurang Layak (Terbatas)
                </td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">12.20 mdpl</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">3,450.10 Ha</td>
                <td className="py-4 px-6 text-right font-mono font-medium text-slate-600">1,850.30 mm</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Catatan Interpretasi Ilmiah */}
        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
            <span className="font-black text-slate-800 block mb-1.5 uppercase tracking-wider">Deskripsi Pola Spasial:</span>
            Penentuan zonasi di atas didasarkan pada kedekatan Euclidean jarak data terhadap 3 titik pusat utama (Centroid). Wilayah yang diklasifikasikan ke dalam warna <span className="text-emerald-600 font-bold">Hijau (Sangat Layak)</span> dicirikan oleh klaster wilayah dengan dominasi luasan lahan kelapa sawit eksisting yang masif serta didukung pasokan curah hujan tahunan yang tinggi. Sebaliknya, wilayah urban atau wilayah dengan keterbatasan luasan fungsional secara otomatis teragregasi pada warna <span className="text-rose-600 font-bold">Merah (Kurang Layak)</span>.
          </p>
        </div>
      </div>
    </main>
  );
}