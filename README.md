# TPQ Hidayatul Mubtadiin

Website profil dan panel admin TPQ Hidayatul Mubtadiin, Tlogohaji — Sumberrejo, Bojonegoro.

Dibangun ulang dengan **React 19 + TypeScript + Vite + Tailwind CSS v4**. Seluruh kode Laravel lama sudah dihapus.

## Menjalankan

```sh
npm install
npm run dev
```

Buka `http://127.0.0.1:5173`.

Build produksi:

```sh
npm run build
npm run preview
```

## Halaman

| Rute | Keterangan |
| --- | --- |
| `/` | Beranda |
| `/informasi` | Galeri kegiatan & pendaftaran |
| `/profil` | Profil pengajar, kelas, santri |
| `/login` | Masuk admin |
| `/admin/ringkasan` | Ringkasan dashboard |
| `/admin/beranda` | Edit foto & deskripsi beranda |
| `/admin/informasi` | Kelola kegiatan & pengaturan kontak |
| `/admin/profil` | Kelola pengajar & kelas |
| `/admin/data` | Data lengkap pengajar & santri |
| `/admin/akun` | Ubah username / password |

## Data (sementara)

Database belum dipasang. Semua data memakai **mock data di `localStorage`** (`tpq-data-v2`), sehingga perubahan dari panel admin tetap tersimpan di browser yang sama.

Akun demo: **admin / admin12345** (tombol "Isi otomatis" tersedia di halaman login).

Foto yang diunggah dikompres otomatis di browser dan disimpan sebagai data URL. Seed awal ada di `src/lib/seed.ts`.

## Teknologi

- React 19, TypeScript, Vite 8
- Tailwind CSS v4 (design token di `src/index.css`)
- react-router-dom v7
- Motion (animasi), Swiper (galeri), lucide-react (ikon)
- Fraunces & Plus Jakarta Sans (self-hosted via @fontsource-variable)
