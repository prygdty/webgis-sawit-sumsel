'use client';

import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// --- Algoritma K-Means (Sebagai Cadangan / Jaring Pengaman) ---
function prosesKMeans(features: any[], k = 3) {
  const data = features.map(f => ({
    name: f.properties.WADMKK,
    elevasi: Number(f.properties.ELEVASI) || 0,
    luas: Number(f.properties.LUAS_SAWIT) || 0,
    hujan: Number(f.properties.CURAH_HUJAN) || 0,
    feature: f
  }));
  const maxE = Math.max(...data.map(d => d.elevasi)), minE = Math.min(...data.map(d => d.elevasi));
  const maxL = Math.max(...data.map(d => d.luas)), minL = Math.min(...data.map(d => d.luas));
  const maxH = Math.max(...data.map(d => d.hujan)), minH = Math.min(...data.map(d => d.hujan));
  data.forEach(d => {
    d.nE = (d.elevasi - minE) / (maxE - minE || 1);
    d.nL = (d.luas - minL) / (maxL - minL || 1);
    d.nH = (d.hujan - minH) / (maxH - minH || 1);
  });
  let centroids = data.slice(0, k).map(d => ({ e: d.nE, l: d.nL, h: d.nH }));
  let assignments = new Array(data.length).fill(-1);
  for (let iter = 0; iter < 10; iter++) {
    let changed = false;
    data.forEach((d, i) => {
      let minDt = Infinity; let cluster = -1;
      centroids.forEach((c, ci) => {
        const dist = Math.sqrt(Math.pow(d.nE - c.e, 2) + Math.pow(d.nL - c.l, 2) + Math.pow(d.nH - c.h, 2));
        if (dist < minDt) { minDt = dist; cluster = ci; }
      });
      if (assignments[i] !== cluster) { assignments[i] = cluster; changed = true; }
    });
    if (!changed) break; 
    for (let ci = 0; ci < k; ci++) {
      const clusterPoints = data.filter((_, i) => assignments[i] === ci);
      if (clusterPoints.length > 0) {
        centroids[ci].e = clusterPoints.reduce((s, p) => s + p.nE, 0) / clusterPoints.length;
        centroids[ci].l = clusterPoints.reduce((s, p) => s + p.nL, 0) / clusterPoints.length;
        centroids[ci].h = clusterPoints.reduce((s, p) => s + p.nH, 0) / clusterPoints.length;
      }
    }
  }
  data.forEach((d, i) => { d.feature.properties.cluster = assignments[i]; });
  return features;
}

export default function Map({ activeCluster }: { activeCluster?: number | null }) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    const ambilDataAI = async () => {
      try {
        // 1. Ambil peta mentah dari folder publik
        const responLokal = await fetch('/Peta_sawit_sumsel.geojson');
        const dataLokal = await responLokal.json();

        // 2. Lempar ke mesin AI Hugging Face
        // Pastikan endpoint ini sesuai dengan route di app.py kamu (misal: /predict atau /api/cluster)
        // Jika app.py kamu tidak pakai route khusus, coba hapus '/predict' di ujung URL-nya.
        const responAI = await fetch('https://prygdty-geosawit-ai.hf.space/predict', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataLokal) 
        });

        if (!responAI.ok) throw new Error('API Hugging Face menolak request');

        // 3. Terima hasil dari AI
        const dataMatang = await responAI.json();
        setGeoData(dataMatang);
        console.log("SUKSES: Peta diproses menggunakan AI Hugging Face!");

      } catch (error) {
        console.warn("AI Hugging Face gagal diakses, otomatis pakai sistem lokal cadangan...", error);
        
        // JARING PENGAMAN: Fallback ke K-Means Lokal
        fetch('/Peta_sawit_sumsel.geojson')
          .then((res) => res.json())
          .then((data) => {
            const clusteredFeatures = prosesKMeans(data.features, 3);
            data.features = clusteredFeatures;
            setGeoData(data);
          });
      }
    };

    ambilDataAI();
  }, []);

  const style = (feature: any) => {
    const cluster = feature.properties.cluster;
    const isFaded = activeCluster !== null && activeCluster !== undefined && activeCluster !== cluster;
    const isHighlighted = activeCluster === cluster;
    const colors = ['#10b981', '#f59e0b', '#ef4444']; // Emerald, Amber, Red

    return {
      fillColor: colors[cluster] || '#94a3b8', // Default warna abu jika cluster tidak terbaca
      weight: isHighlighted ? 3 : 1.5,
      opacity: isFaded ? 0.3 : 1,
      color: isHighlighted ? '#0f172a' : 'white',
      fillOpacity: isFaded ? 0.1 : 0.75
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const p = feature.properties;
    const colors = ['#10b981', '#f59e0b', '#ef4444'];
    const clusterName = ['Kawasan Emas', 'Kawasan Berkembang', 'Kawasan Terbatas'];
    
    // Fallback jika property cluster belum ada (mencegah error popup)
    const clusIdx = p.cluster !== undefined ? p.cluster : 0;
    
    const popupContent = `
      <div style="font-family: sans-serif; min-width: 220px; padding: 5px;">
        <h3 style="margin: 0 0 10px 0; border-bottom: 2px solid ${colors[clusIdx]}; padding-bottom: 8px; color: #1e293b; font-weight: 800; font-size: 14px; text-transform: uppercase;">
          KAB. ${p.WADMKK}
        </h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px;">
          <span style="color: #64748b; font-weight: bold;">🏔️ Elevasi:</span> 
          <span style="color: #0f172a; font-weight: 800;">${p.ELEVASI} mdpl</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px;">
          <span style="color: #64748b; font-weight: bold;">🌴 Luas Lahan:</span> 
          <span style="color: #0f172a; font-weight: 800;">${p.LUAS_SAWIT ? p.LUAS_SAWIT.toLocaleString('id-ID') : 0} Ha</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px;">
          <span style="color: #64748b; font-weight: bold;">🌧️ Curah Hujan:</span> 
          <span style="color: #0f172a; font-weight: 800;">${p.CURAH_HUJAN} mm</span>
        </div>
        
        <div style="padding: 6px; background: ${colors[clusIdx]}; color: white; text-align: center; border-radius: 6px; font-weight: bold; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
          ${clusterName[clusIdx]}
        </div>
      </div>
    `;
    layer.bindPopup(popupContent);
  };

  return (
    <div style={{ height: '600px', width: '100%', zIndex: 0 }}>
      <MapContainer center={[-3.3194, 104.9147]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <LayersControl position="topright">
          {/* Pilihan Base Map (Radio Button) */}
          <LayersControl.BaseLayer checked name="🌐 OpenStreetMap (OSM)">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OSM' />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="🛰️ Citra Satelit Bumi">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='Tiles &copy; Esri' />
          </LayersControl.BaseLayer>

          {/* Pilihan Layer Data (Ceklis) */}
          {geoData && (
            <LayersControl.Overlay checked name="🗺️ Batas Administrasi K-Means">
              <GeoJSON 
                key={`map-${activeCluster}`} 
                data={geoData} 
                style={style}
                onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>
          )}
        </LayersControl>
      </MapContainer>
    </div>
  );
}