import { NextResponse } from 'next/server';
// Mengambil mesin Prisma yang kemarin kita buat
import { prisma } from '@/lib/prisma'; 

export async function GET() {
  try {
    // Sedot data dari tabel Region
    const regions = await prisma.region.findMany({
      select: {
        name: true,
        elevation: true,
        area: true,
        rainfall: true
      }
    });
    
    return NextResponse.json({ status: 'sukses', data: regions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 'error', message: 'Gagal menyedot database' },
      { status: 500 }
    );
  }
}