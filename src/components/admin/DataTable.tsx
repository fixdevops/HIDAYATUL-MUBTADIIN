import { Inbox, Pencil, Trash2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../lib/store';
import type { Resource } from '../../lib/types';
import { initials } from '../../lib/utils';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';

export interface DataColumn<T> {
    key: string;
    label: string;
    className?: string;
    primary?: boolean;
    render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends { id: number }> {
    columns: DataColumn<T>[];
    rows: T[];
    resource: Resource;
    back: 'profil' | 'data' | 'informasi';
    label: string;
    emptyText?: string;
}

export function DataTable<T extends { id: number }>({
    columns,
    rows,
    resource,
    back,
    label,
    emptyText = 'Belum ada data. Klik tombol Tambah untuk mulai mengisi.',
}: DataTableProps<T>) {
    const { removeItem } = useData();
    const { push } = useToast();
    const [pending, setPending] = useState<T | null>(null);

    const primaryColumn = columns.find((column) => column.primary) ?? columns[0];
    const detailColumns = columns.filter((column) => column.key !== primaryColumn.key);

    const valueOf = (row: T, key: string) => row[key as keyof T] as unknown;

    const renderValue = (column: DataColumn<T>, row: T) => {
        if (column.render) return column.render(row);
        const value = valueOf(row, column.key);
        if (!value) return <span className="text-xs italic text-ink/25">belum diisi</span>;
        return <span className="text-ink/60">{String(value)}</span>;
    };

    const actions = (row: T) => (
        <div className="flex justify-end gap-1">
            <Link
                to={`/admin/${resource}/${row.id}/edit?back=${back}`}
                title="Edit"
                aria-label="Edit"
                className="grid h-8 w-8 place-items-center rounded-full text-ink/40 transition hover:bg-brand-50 hover:text-brand-700"
            >
                <Pencil className="h-4 w-4" />
            </Link>
            <button
                type="button"
                onClick={() => setPending(row)}
                title="Hapus"
                aria-label="Hapus"
                className="grid h-8 w-8 place-items-center rounded-full text-ink/30 transition hover:bg-red-50 hover:text-red-500"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );

    return (
        <>
            <div className="admin-card overflow-hidden">
                {/* Tampilan kartu untuk layar kecil */}
                <div className="divide-y divide-ink/5 sm:hidden">
                    {rows.length > 0 ? (
                        rows.map((row) => {
                            const primaryValue = String(valueOf(row, primaryColumn.key) ?? '');
                            return (
                                <div key={row.id} className="p-4">
                                    <div className="flex items-start gap-3">
                                        {primaryColumn.primary && (
                                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-700 to-brand-950 font-display text-[12px] text-gold-200 ring-1 ring-brand-950/10">
                                                {initials(primaryValue || '?')}
                                            </span>
                                        )}
                                        <div className="min-w-0 flex-1 pt-0.5">
                                            {primaryColumn.render ? (
                                                primaryColumn.render(row)
                                            ) : (
                                                <p className="font-semibold text-ink">{primaryValue}</p>
                                            )}
                                        </div>
                                        {actions(row)}
                                    </div>
                                    {detailColumns.length > 0 && (
                                        <dl className="mt-3 space-y-1.5 pl-0">
                                            {detailColumns.map((column) => (
                                                <div key={column.key} className="flex gap-3 text-xs">
                                                    <dt className="w-28 shrink-0 text-ink/35">{column.label}</dt>
                                                    <dd className="min-w-0 flex-1 leading-relaxed">
                                                        {renderValue(column, row)}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center px-5 py-12 text-center">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-ink/25">
                                <Inbox className="h-5 w-5" />
                            </span>
                            <p className="mt-3 text-sm font-medium text-ink/60">Belum ada data</p>
                            <p className="mt-1 max-w-[240px] text-xs text-ink/35">{emptyText}</p>
                        </div>
                    )}
                </div>

                {/* Tabel untuk layar lebar */}
                <div className="hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-ink/5 bg-cream/60">
                                <th className="table-th w-14">No</th>
                                {columns.map((column) => (
                                    <th key={column.key} className={`table-th ${column.className ?? ''}`}>
                                        {column.label}
                                    </th>
                                ))}
                                <th className="table-th w-24 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                            {rows.length > 0 ? (
                                rows.map((row, index) => (
                                    <tr key={row.id} className="group transition hover:bg-cream/60">
                                        <td className="px-5 py-3.5 font-display text-xs text-ink/30">{index + 1}</td>
                                        {columns.map((column) => {
                                            const value = valueOf(row, column.key);
                                            return (
                                                <td key={column.key} className={`px-5 py-3.5 ${column.className ?? ''}`}>
                                                    {column.render ? (
                                                        column.render(row)
                                                    ) : column.primary ? (
                                                        <div className="flex items-center gap-3">
                                                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-700 to-brand-950 font-display text-[13px] text-gold-200 ring-1 ring-brand-950/10">
                                                                {initials(String(value || '?'))}
                                                            </span>
                                                            <span className="font-semibold text-ink">
                                                                {String(value ?? '')}
                                                            </span>
                                                        </div>
                                                    ) : value ? (
                                                        <span className="line-clamp-1 max-w-[240px] text-ink/60">
                                                            {String(value)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs italic text-ink/25">belum diisi</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                        <td className="px-5 py-3.5">{actions(row)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 2} className="px-5 py-14">
                                        <div className="flex flex-col items-center text-center">
                                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-ink/25">
                                                <Inbox className="h-5 w-5" />
                                            </span>
                                            <p className="mt-3 text-sm font-medium text-ink/60">Belum ada data</p>
                                            <p className="mt-1 max-w-xs text-xs text-ink/35">{emptyText}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={pending !== null}
                title={`Hapus ${label.toLowerCase()}?`}
                message={`Data "${String(
                    (pending as unknown as Record<string, unknown> | null)?.nama ??
                        (pending as unknown as Record<string, unknown> | null)?.judul ??
                        '',
                )}" akan dihapus permanen dari daftar.`}
                onClose={() => setPending(null)}
                onConfirm={() => {
                    if (pending) {
                        removeItem(resource, pending.id);
                        push(`${label} berhasil dihapus.`);
                    }
                }}
            />
        </>
    );
}
