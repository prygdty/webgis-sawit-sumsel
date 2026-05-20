import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // <--- Ini mantra untuk membaca password acak

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Cari apakah email tersebut ada di Database PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // Jika email tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Email tidak terdaftar, Bos! Silakan daftar dulu.' },
        { status: 404 }
      );
    }

    // 2. Cocokkan Password (Membuka gembok enkripsi Bcrypt)
    // Mesin akan membandingkan teks yang kamu ketik dengan teks acak di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 'error', message: 'Password salah! Coba ingat-ingat lagi.' },
        { status: 401 }
      );
    }

    // 3. Jika Email dan Password COCOK
    return NextResponse.json({
      status: 'sukses',
      message: 'Login berhasil!',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Detail Error API Login:", error);
    return NextResponse.json(
      { status: 'error', message: 'Terjadi kesalahan sistem di server.' },
      { status: 500 }
    );
  }
}