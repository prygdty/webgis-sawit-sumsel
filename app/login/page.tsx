'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Tambahan untuk pindah halaman otomatis

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Tambahan state loading

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mengirim data ke jalur API login
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok || data.status === 'sukses') {
        alert("Login Berhasil! Selamat datang kembali.");
        // Otomatis pindah ke halaman K-Means Engine Geo Sawit setelah berhasil
        router.push('/metode'); 
      } else {
        alert("Login Gagal: " + (data.message || "Email atau password salah."));
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("Terjadi kesalahan sistem saat mencoba login.");
    }

    setLoading(false);
  };

  return (
    // Background menyesuaikan nuansa modern dengan gradasi halus
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-slate-200 p-4">
      
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        
        {/* Header Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Login</h1>
          <p className="text-slate-500 mt-1 font-medium">Masuk untuk mengakses sistem</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-start pt-1">
            <a href="#" className="text-[13px] font-medium text-slate-500 hover:text-blue-600 transition-colors">
              Lupa Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 rounded-xl font-semibold tracking-wide shadow-lg transition-all active:scale-[0.98]
              ${loading 
                ? 'bg-gray-400 text-white cursor-not-allowed shadow-none' 
                : 'bg-[#001bfa] hover:bg-blue-800 text-white shadow-blue-500/30'
              }`}
          >
            {loading ? 'Memeriksa Data...' : 'Lanjutkan'}
          </button>
        </form>

        {/* Footer / Register Link */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-slate-500">
            Belum punya akun?{' '}
            <Link href="/register" className="text-slate-900 font-bold hover:text-blue-600 transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}