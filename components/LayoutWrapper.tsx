'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Mengambil informasi jalur URL saat ini
  const pathname = usePathname();

  // Deteksi apakah sedang berada di halaman login atau register
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // Jika halaman Login/Register, tampilkan halamannya SAJA (Full Screen)
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Jika halaman lain (Dashboard dkk), tampilkan lengkap dengan Sidebar & Header
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}