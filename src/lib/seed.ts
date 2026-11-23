import type { StoreData, Student } from './types';

const studentNames = [
    'Ahmad Fauzan Hakim',
    'Muhammad Rizki Pratama',
    'Aisyah Nur Fadilah',
    'Fatimah Azzahra',
    'Bilal Abdul Ghani',
    'Naufal Zaki',
    'Salma Kamila',
    'Yusuf Maulana',
    'Zahra Aulia',
    'Raka Aditya',
    'Nadia Rahmawati',
    'Fikri Ramadhan',
    'Anisa Putri',
    'Hasan Basri',
    'Husna Fitria',
    'Ilham Saputra',
    'Keysha Anindya',
    'Lukman Hakim',
    'Mutiara Salsabila',
    'Nabil Arkan',
    'Qanita Zhafira',
    'Rafif Hidayat',
    'Salwa Nabila',
    'Syifa Aulia',
    'Umar Faruq',
    'Wafa Kamila',
    'Zaid Alfarizi',
    'Zulfa Amani',
    'Alifia Rahma',
    'Arsyila Putri',
    'Daniyal Akbar',
    'Elsa Nur Aini',
];

const classSizes = [6, 6, 5, 5, 5, 5];

function buildStudents(): Student[] {
    const rows: Student[] = [];
    let index = 0;

    classSizes.forEach((size, classIndex) => {
        for (let i = 0; i < size; i += 1) {
            const name = studentNames[index] ?? `Santri ${index + 1}`;
            rows.push({
                id: index + 1,
                nama: name,
                ttl: `${['Bojonegoro', 'Tuban', 'Bojonegoro', 'Lamongan'][index % 4]}, ${
                    (index % 28) + 1
                } ${['Januari', 'Maret', 'Mei', 'Juli', 'September', 'November'][index % 6]} ${2013 + (index % 5)}`,
                alamat: `${['Tlogohaji', 'Sumberrejo', 'Tlogohaji', 'Sendangrejo'][index % 4]}, Sumberrejo`,
                class_id: classIndex + 1,
            });
            index += 1;
        }
    });

    return rows;
}

export const seedData: StoreData = {
    user: { username: 'admin', password: 'admin12345' },
    settings: {
        whatsapp: '0895xxxxxxxx',
        link_daftar: 'https://forms.gle/ganti-link-ini',
        alamat: 'Jl. Sutodongso, Desa Tlogohaji (RT 03 / RW 01), Kecamatan Sumberrejo, Bojonegoro',
        instagram: "TPQ Hidayatul Mubtadi'in",
        facebook: "TPQ HIDAYATUL MUBTADI'IEN",
        maps_url: 'https://maps.google.com/?q=Tlogohaji+Sumberrejo+Bojonegoro',
    },
    home: {
        foto_1: '/images/hero.webp',
        foto_2: '/images/about.webp',
        deskripsi_1:
            "TPQ Hidayatul Mubtadiin membimbing santri membaca Al-Qur'an dengan suasana yang hangat, tertib, dan penuh perhatian. Bimbingan bertahap disesuaikan usia dan kemampuan setiap santri.",
        deskripsi_2:
            "Kami percaya belajar Al-Qur'an bukan hanya tentang huruf dan hukum bacaan, tetapi juga tentang adab, kesabaran, dan kebiasaan baik yang tumbuh setiap hari. Di kelas yang tenang dan menyenangkan, setiap anak dibimbing untuk percaya diri membaca dengan tartil.",
    },
    teachers: [
        {
            id: 1,
            nama: 'Weny Dwi Martina',
            jabatan: 'Ustadzah',
            ttl: 'Bojonegoro, 12 Mei 1992',
            alamat: 'Tlogohaji, Sumberrejo',
        },
        {
            id: 2,
            nama: 'Supiah',
            jabatan: 'Ustadzah',
            ttl: 'Bojonegoro, 3 Februari 1990',
            alamat: 'Sumberrejo, Bojonegoro',
        },
        {
            id: 3,
            nama: 'Dian Mulyani',
            jabatan: 'Ustadzah',
            ttl: 'Tuban, 21 Agustus 1995',
            alamat: 'Tlogohaji, Sumberrejo',
        },
        {
            id: 4,
            nama: 'Agus Prianto',
            jabatan: 'Ustadz',
            ttl: 'Bojonegoro, 17 Oktober 1988',
            alamat: 'Sendangrejo, Sumberrejo',
        },
        {
            id: 5,
            nama: 'Rustiningsih',
            jabatan: 'Ustadzah',
            ttl: 'Lamongan, 9 Juni 1993',
            alamat: 'Tlogohaji, Sumberrejo',
        },
    ],
    classes: [
        { id: 1, nama: 'Kelas 1', keterangan: 'Pengenalan huruf hijaiyah dan makhraj dasar.' },
        { id: 2, nama: 'Kelas 2', keterangan: 'Iqra 1–2 dengan pembiasaan membaca harian.' },
        { id: 3, nama: 'Kelas 3', keterangan: 'Iqra 3–4, latihan kelancaran dan tartil.' },
        { id: 4, nama: 'Kelas 4', keterangan: 'Iqra 5–6 menuju Al-Qur’an.' },
        { id: 5, nama: 'Kelas 5', keterangan: 'Al-Qur’an dan tajwid dasar.' },
        { id: 6, nama: 'Kelas 6', keterangan: 'Tahfiz juz 30 dan muhadharah.' },
    ],
    students: buildStudents(),
    activities: [
        {
            id: 1,
            judul: 'Belajar bersama di kelas',
            deskripsi: 'Suasana santri mengikuti pembelajaran hari ini dengan tertib dan gembira.',
            foto: '/images/gallery-1.webp',
        },
        {
            id: 2,
            judul: "Praktik membaca Al-Qur'an",
            deskripsi: 'Santri bergiliran membaca di depan ustadzah untuk melatih kelancaran dan tartil.',
            foto: '/images/gallery-3.webp',
        },
        {
            id: 3,
            judul: 'Kegiatan pembiasaan adab',
            deskripsi: 'Adab sebelum dan sesudah belajar ditumbuhkan sebagai kebiasaan sehari-hari.',
            foto: '/images/gallery-2.webp',
        },
        {
            id: 4,
            judul: 'Bimbingan ustadzah',
            deskripsi: 'Pendampingan personal untuk santri yang membutuhkan perhatian lebih.',
            foto: '/images/about.webp',
        },
    ],
};
