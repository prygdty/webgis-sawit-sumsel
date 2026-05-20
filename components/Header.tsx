'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Bagian Kiri: Breadcrumb Navigasi Bersih (Tanpa Tombol Panah Ganda) */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-wide uppercase">
          <span className="text-slate-400">GEO SAWIT</span>
          <span className="text-slate-300">/</span>
          {/* Teks Sub-Halaman dengan Style Tegak Akademis */}
          <span className="text-emerald-600 font-black tracking-wider">GAMBARAN UMUM SISTEM</span>
        </div>
      </div>

      {/* Bagian Kanan: Info Sinkronisasi & Profil */}
      <div className="flex items-center gap-5">
        
        {/* Teks Sinkronisasi BPS */}
        <div className="hidden md:flex flex-col items-end justify-center text-right">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">SINKRONISASI BPS</span>
          <span className="text-slate-700 text-xs font-semibold tracking-wide">Provinsi Sumatera Selatan</span>
        </div>

        {/* Garis Pemisah vertikal */}
        <div className="hidden md:block h-8 w-[1px] bg-slate-200"></div>

        {/* Badge Luas Lahan Sawit */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black tracking-widest uppercase">LUAS LAHAN SAWIT: 1,2 JUTA HA</span>
        </div>

        {/* Tombol Profil / Login */}
        <Link 
          href="/login" 
          className="h-10 w-10 ml-2 flex items-center justify-center rounded-full border-2 border-slate-100 bg-slate-50 hover:bg-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer shadow-sm group"
          title="Masuk / Login"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-slate-500 group-hover:text-blue-600 transition-colors"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
        
      </div>
    </header>
  );
}