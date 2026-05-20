'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  // State untuk kontrol buka/tutup sidebar
  const [isOpen, setIsOpen] = useState(true);
  
  // Deteksi halaman aktif
  const pathname = usePathname();

  // Daftar menu dengan bahasa yang lebih teknis/profesional
  const menuItems = [
    { name: 'System Overview', path: '/', icon: HomeIcon },
    { name: 'Spatial Analytics', path: '/peta', icon: MapIcon },
    { name: 'Data Integration', path: '/data', icon: DatabaseIcon },
    { name: 'K-Means Engine', path: '/metode', icon: CpuIcon },
  ];

  return (
    <aside 
      className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Tombol Toggle Buka/Tutup (Bulat di pinggir kanan) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3.5 top-8 bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 rounded-full p-1.5 shadow-sm transition-all z-[60]"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Header / Logo Area (Full White) */}
      <div className="h-24 flex items-center justify-center border-b border-slate-100/80">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Ikon Logo */}
          <div className="bg-emerald-500 bg-gradient-to-br from-emerald-400 to-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-200 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          
          {/* Teks Logo (Hanya muncul jika sidebar terbuka) */}
          <div className={`flex flex-col whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0'}`}>
            <span className="font-black text-slate-800 text-xl tracking-tight leading-none">
              Geo<span className="text-emerald-600">Sawit</span>
            </span>
            <span className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase mt-0.5">
              Enterprise
            </span>
          </div>
        </div>
      </div>

      {/* Area Menu Navigasi */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {menuItems.map((item) => {
          // Cek apakah menu ini sedang aktif
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              title={!isOpen ? item.name : ''} // Munculkan tooltip teks saat sidebar ditutup
              className={`flex items-center gap-3.5 px-3 py-3.5 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-emerald-50/50 border border-emerald-100/50' 
                  : 'border border-transparent hover:bg-slate-50'
                }`}
            >
              <div className={`flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`}>
                <item.icon />
              </div>
              
              {/* Teks Menu */}
              <span 
                className={`text-sm font-bold whitespace-nowrap transition-all duration-300
                  ${isActive ? 'text-emerald-700' : 'text-slate-500 group-hover:text-slate-700'}
                  ${isOpen ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0 hidden'}
                `}
              >
                {item.name}
              </span>

              {/* Indikator aktif di sebelah kanan */}
              {isActive && isOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Area Bawah / Footer Sidebar */}
      <div className={`p-4 border-t border-slate-100 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">System Online</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            Data terhubung dengan server BPS Prov. Sumatera Selatan.
          </p>
        </div>
      </div>
    </aside>
  );
}

// --- KUMPULAN SVG ICON CLEAN & MODERN ---

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" y1="3" x2="9" y2="22"></line>
      <line x1="15" y1="3" x2="15" y2="22"></line>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  );
}