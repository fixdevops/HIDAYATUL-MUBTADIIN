import type { Resource } from './types';

export type FieldType = 'text' | 'textarea' | 'file' | 'class';

export interface FieldDef {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    hint?: string;
}

export interface ResourceDef {
    label: string;
    singular: string;
    back: 'profil' | 'data' | 'informasi';
    fields: FieldDef[];
}

export const resourceConfig: Record<Resource, ResourceDef> = {
    teachers: {
        label: 'Pengajar',
        singular: 'pengajar',
        back: 'profil',
        fields: [
            { name: 'nama', label: 'Nama lengkap', type: 'text', required: true, placeholder: 'Nama pengajar' },
            { name: 'jabatan', label: 'Jabatan', type: 'text', placeholder: 'Ustadz / Ustadzah' },
            { name: 'ttl', label: 'Tempat, tanggal lahir', type: 'text', placeholder: 'Bojonegoro, 1 Januari 1990' },
            { name: 'alamat', label: 'Alamat', type: 'textarea' },
        ],
    },
    students: {
        label: 'Santri',
        singular: 'santri',
        back: 'data',
        fields: [
            { name: 'nama', label: 'Nama lengkap', type: 'text', required: true, placeholder: 'Nama santri' },
            { name: 'ttl', label: 'Tempat, tanggal lahir', type: 'text', placeholder: 'Bojonegoro, 1 Januari 2015' },
            { name: 'alamat', label: 'Alamat', type: 'textarea' },
            { name: 'class_id', label: 'Kelas', type: 'class' },
        ],
    },
    classes: {
        label: 'Kelas',
        singular: 'kelas',
        back: 'profil',
        fields: [
            { name: 'nama', label: 'Nama kelas', type: 'text', required: true, placeholder: 'Kelas 1' },
            { name: 'keterangan', label: 'Keterangan', type: 'text', placeholder: 'Materi atau catatan singkat' },
        ],
    },
    activities: {
        label: 'Kegiatan',
        singular: 'kegiatan',
        back: 'informasi',
        fields: [
            { name: 'judul', label: 'Judul kegiatan', type: 'text', required: true, placeholder: 'Belajar bersama di kelas' },
            { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
            { name: 'foto', label: 'Foto kegiatan', type: 'file', hint: 'JPG / PNG, otomatis dioptimalkan.' },
        ],
    },
};
