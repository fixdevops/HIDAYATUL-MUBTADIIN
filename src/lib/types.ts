export interface Settings {
    whatsapp: string;
    link_daftar: string;
    alamat: string;
    instagram: string;
    facebook: string;
    maps_url: string;
}

export interface HomeContent {
    foto_1: string;
    deskripsi_1: string;
    foto_2: string;
    deskripsi_2: string;
}

export interface Teacher {
    id: number;
    nama: string;
    jabatan?: string;
    ttl?: string;
    alamat?: string;
}

export interface Classroom {
    id: number;
    nama: string;
    keterangan?: string;
}

export interface Student {
    id: number;
    nama: string;
    ttl?: string;
    alamat?: string;
    class_id?: number | null;
}

export interface Activity {
    id: number;
    judul: string;
    deskripsi?: string;
    foto?: string;
}

export interface AdminUser {
    username: string;
    password: string;
}

export interface StoreData {
    settings: Settings;
    home: HomeContent;
    teachers: Teacher[];
    students: Student[];
    classes: Classroom[];
    activities: Activity[];
    user: AdminUser;
}

export type Resource = 'teachers' | 'students' | 'classes' | 'activities';

export type DataValues = Record<string, string | number | null | undefined>;
