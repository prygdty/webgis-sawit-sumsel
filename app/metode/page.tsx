"use client";

import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';

export default function MetodePage() {
  const [hasilClustering, setHasilClustering] = useState<any[]>([]);
  const [centroidData, setCentroidData] = useState<any[]>([]);
  const [plotData, setPlotData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);

  const prosesPerhitungan = async () => {
    setLoading(true);
    try {
      // 1. Ambil data mentah langsung dari GeoJSON (Biar sama persis dengan Peta!)
      const dbRes = await fetch('/Peta_sawit_sumsel.geojson');
      
      if (!dbRes.ok) {
        alert("Sistem gagal menemukan file peta GeoJSON.");
        setLoading(false);
        return;
      }

      const dbJson = await dbRes.json();
      const dataAsli = dbJson.features; // Leaflet pakai .features
      
      if (!dataAsli || dataAsli.length === 0) {
        alert("Data spasial tidak ditemukan di dalam GeoJSON.");
        setLoading(false);
        return;
      }

      // 2. Format ulang data dari GeoJSON agar cocok dengan AI Python
      const dataSiapHitung = dataAsli.map((item: any) => ({
        nama: item.properties.WADMKK,
        elevasi: Number(item.properties.ELEVASI) || 0,
        luas_lahan: Number(item.properties.LUAS_SAWIT) || 0,
        curah_hujan: Number(item.properties.CURAH_HUJAN) || 0
      }));

      // 3. Tembak data ke AI Hugging Face yang sudah ONLINE! 🚀
      const response = await fetch('https://prygdty-geosawit-ai.hf.space/api/hitung-kmeans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataSiapHitung }) 
      });

      const rawText = await response.text(); 
      if (!rawText) {
        alert("Server analitik Hugging Face tidak memberikan respon.");
        setLoading(false);
        return;
      }

      try {
        const resData = JSON.parse(rawText);
        if (resData.status === 'sukses') {
          setHasilClustering(resData.data);
          setCentroidData(resData.centroid_optimal || []);
          setPlotData(resData.titik_plot || []);
        } else {
          alert("Terjadi kesalahan pada pemrosesan algoritma: " + resData.pesan);
        }
      } catch (parseError) {
        alert("Format respon dari server analitik tidak valid.");
      }

    } catch (error) {
      alert("Gagal mengeksekusi modul pemrosesan. Pastikan layanan Hugging Face aktif.");
    }
    setLoading(false);
  };

  // Membagi titik koordinat secara dinamis berdasarkan respons klaster asli dari Python
  const c1Points = plotData.filter(p => p.clusterId === 1);
  const c2Points = plotData.filter(p => p.clusterId === 2);
  const c3Points = plotData.filter(p => p.clusterId === 3);

  // Tooltip custom saat mendekati kursor ke titik grafik
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950 text-white p-3 rounded-xl text-xs font-sans shadow-xl border border-slate-800">
          <p className="font-bold border-b border-slate-800 pb-1 mb-1.5 text-yellow-400 tracking-wide uppercase">{data.nama}</p>
          <p className="text-slate-300">Luas Lahan: <span className="font-mono text-white font-semibold">{data.luas_lahan.toLocaleString('id-ID')} Ha</span></p>
          <p className="text-slate-300">Curah Hujan: <span className="font-mono text-white font-semibold">{data.curah_hujan.toLocaleString('id-ID')} mm</span></p>
          {data.elevasi && <p className="text-slate-300">Elevasi Lahan: <span className="font-mono text-white font-semibold">{data.elevasi} mdpl</span></p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Modul Analisis K-Means Clustering</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Fasilitas pemrosesan spasial dan evaluasi validitas pengelompokan lahan komoditas kelapa sawit Provinsi Sumatra Selatan.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={prosesPerhitungan}
            disabled={loading}
            className={`mb-8 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm flex items-center justify-center gap-2
              ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98]'}`}
          >
            {loading ? 'Memproses Komputasi di Awam Hugging Face...' : 'Jalankan Analisis Spasial'}
          </button>

          {hasilClustering.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* TABEL METRIK EVALUASI */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="bg-slate-50 p-3.5 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Tabel 1: Nilai Validitas Klaster</h3>
                </div>
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-slate-100/50 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold text-slate-700">Skenario</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-700 text-center">Silhouette</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-700 text-center">DBI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hasilClustering.map((data, index) => (
                      <tr key={index} className={data.k === 3 ? 'bg-emerald-50/40 font-bold' : ''}>
                        <td className="py-2.5 px-4">Klaster (K) = {data.k} {data.k === 3 && '⭐'}</td>
                        <td className="py-2.5 px-4 text-center font-mono">{data.silhouette}</td>
                        <td className="py-2.5 px-4 text-center font-mono">{data.dbi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TABEL DATA NILAI CENTROID ASLI */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div className="bg-slate-50 p-3.5 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Tabel 2: Titik Pusat Karakteristik (Centroid Real)</h3>
                </div>
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-slate-100/50 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold text-slate-700">Pusat Klaster</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-700 text-right">Rerata Lahan (Ha)</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-700 text-right">Rerata Hujan (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-600">
                    {centroidData.map((center, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-800 font-sans">{center.nama}</td>
                        <td className="py-2.5 px-4 text-right">{center.luas_lahan.toLocaleString('id-ID')}</td>
                        <td className="py-2.5 px-4 text-right">{center.curah_hujan.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SCATTER PLOT GRAFIK SEBARAN REAL DATA & CENTROID */}
          {plotData.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white mt-8 shadow-sm">
              <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Visualisasi Sebaran Geometris & Centroid Real-Time
                </h3>
                <span className="px-2 py-0.5 bg-yellow-400 text-slate-900 font-black text-[10px] rounded uppercase font-mono tracking-wider">
                  Centroid K-Means Matematisterpaut
                </span>
              </div>
              
              <div className="p-6 bg-white flex justify-center items-center">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        type="number" 
                        dataKey="luas_lahan" 
                        name="Luas Lahan" 
                        unit=" Ha" 
                        tickFormatter={(v) => v.toLocaleString('id-ID')}
                        stroke="#94a3b8"
                        fontSize={11}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="curah_hujan" 
                        name="Curah Hujan" 
                        unit=" mm" 
                        tickFormatter={(v) => v.toLocaleString('id-ID')}
                        stroke="#94a3b8"
                        fontSize={11}
                      />
                      <ZAxis type="number" dataKey="size" range={[70, 350]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                      
                      {/* Titik Sebaran Daerah Kelompok Sawit */}
                      <Scatter name="Wilayah Kelompok 1" data={c1Points} fill="#ef4444" shape="circle" />
                      <Scatter name="Wilayah Kelompok 2" data={c2Points} fill="#2563eb" shape="circle" />
                      <Scatter name="Wilayah Kelompok 3" data={c3Points} fill="#16a34a" shape="circle" />
                      
                      {/* TITIK PUSAT KLASTER UTAMA (Centroid Kuning Gede Menyilaukan) */}
                      <Scatter name="Pusat Karakteristik (Centroid)" data={centroidData} fill="#facc15" shape="circle" stroke="#eab308" strokeWidth={2.5} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
                Sumbu X: Luas Lahan Kelapa Sawit (Hektar) | Sumbu Y: Intensitas Curah Hujan Rata-rata (mm/Tahun)
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}