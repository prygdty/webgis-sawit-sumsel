'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Mengirim data ke jalur API
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Jika sukses tersimpan di database
        alert('Pendaftaran berhasil! Silakan Login.');
        router.push('/login'); // Otomatis pindah ke halaman login
      } else {
        // Jika gagal (contoh: email sudah dipakai)
        setErrorMsg(data.message || 'Gagal mendaftar');
      }
    } catch (error) {
      setErrorMsg('Terjadi kesalahan jaringan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Register</h1>
          <p className="text-slate-500 mt-1 font-medium">Buat akun Geo Sawit baru</p>
        </div>

        {/* Notifikasi Error muncul di sini jika ada salah */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all text-sm font-medium"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (cth: admin@admin.com)"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all text-sm font-medium"
              required
              disabled={isLoading}
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
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-[#001bfa] hover:bg-blue-800 text-white rounded-xl font-semibold tracking-wide shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
               // Animasi loading muter-muter
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-slate-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-slate-900 font-bold hover:text-blue-600 transition-colors">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}