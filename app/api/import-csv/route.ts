import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // JURUS BYPASS: Taruh isi CSV kamu langsung di dalam kutip miring (backtick) ini.
    // (Saya sudah copy-kan dari data CSV yang kamu kirim, silakan cek 2 baris terakhir kalau ada yang kurang pas)
    const csvText = `KABUPATEN;ELEVASI;LUAS_SAWIT;CURAH_HUJAN
Ogan Komering Ulu;1016.5;72517;2450
Ogan Komering Ilir;46;154224;2300
Muara Enim;1359.5;148377;2600
Lahat;1559;24304;2800
Musi Rawas;1001.5;106501;2750
Musi Banyuasin;77.5;202053;2400
Banyuasin;27.5;101641;2350
Ogan Komering Ulu Selatan;1361.5;4271;2700
Ogan Komering Ulu Timur;224;74628;2350
Ogan Ilir;31;36106;2200
Empat Lawang;1359.5;4136;2850
Penukal Abab Lematang Ilir;55.5;70268;2500
Musi Rawas Utara;1191;177120;2800
Kota Palembang;18.5;445;2100
Kota Prabumulih;41;19096;2450
Kota Pagar Alam;1739;92;2900
Kota Lubuklinggau;129;0;2850`;

    // Pecah baris dan bersihkan
    const rows = csvText.split(/\r?\n/).map(row => row.trim()).filter(row => row.length > 0);
    
    const dataToInsert = [];
    
    // Looping data (Loncat baris pertama/header)
    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(';'); 
      
      if (cols.length >= 4) {
        dataToInsert.push({
          name: cols[0].trim(),
          province: "SUMATERA SELATAN",
          elevation: parseFloat(cols[1].replace(',', '.')), 
          area: parseFloat(cols[2].replace(',', '.')),
          rainfall: parseFloat(cols[3].replace(',', '.')),
          description: "Import otomatis dari Jurus Bypass"
        });
      }
    }

    // Reset tabel biar bersih
    await prisma.region.deleteMany({});

    // Masukkan data massal
    const result = await prisma.region.createMany({
      data: dataToInsert
    });

    return NextResponse.json({ 
      status: 'sukses', 
      message: `Mantap Bos Yoga! ${result.count} data wilayah berhasil disuntikkan ke Database pakai Jurus Bypass!` 
    });

  } catch (error) {
    console.error("Detail Error:", error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Terjadi kesalahan saat import: ' + String(error) 
    }, { status: 500 });
  }
}