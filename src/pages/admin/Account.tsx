import { useState } from 'react';
import type { FormEvent } from 'react';
import { KeyRound, Save, ShieldCheck, UserRound } from 'lucide-react';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { useToast } from '../../components/Toast';
import { useData } from '../../lib/store';
import { initials } from '../../lib/utils';

export function AdminAccount() {
    const { user, updateUser } = useData();
    const { push } = useToast();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const nextUsername = username.trim();
        const nextPassword = password.trim();

        if (!nextUsername && !nextPassword) {
            setError('Isi username atau password baru terlebih dahulu.');
            return;
        }
        if (nextPassword && nextPassword.length < 6) {
            setError('Password minimal 6 karakter.');
            return;
        }

        setError(null);
        updateUser({
            ...(nextUsername ? { username: nextUsername } : {}),
            ...(nextPassword ? { password: nextPassword } : {}),
        });
        setUsername('');
        setPassword('');
        push('Akun berhasil diperbarui.');
    };

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title="Akun"
                description="Perbarui kredensial administrator yang dipakai untuk masuk."
            />

            <div className="grid max-w-4xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="border border-brand-900 bg-brand-900 p-7 text-cream">
                    <div className="relative">
                        <span className="grid h-16 w-16 place-items-center rounded-[2px] border border-white/15 bg-white/5 text-2xl text-gold-200">
                            {initials(user.username, 1)}
                        </span>
                        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">
                            Akun saat ini
                        </p>
                        <p className="mt-2 truncate font-display text-3xl leading-tight">{user.username}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold text-brand-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                            Administrator
                        </span>

                        <div className="mt-8 flex items-start gap-2.5 border-t border-white/10 pt-5 text-xs leading-relaxed text-brand-200/65">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                            Password tersimpan terenkripsi dan tidak dapat ditampilkan. Isi form di samping untuk
                            menggantinya.
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="admin-card overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-ink/5 px-6 py-5 sm:px-7">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                            <UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-ink">Perbarui akun</p>
                            <p className="mt-0.5 text-xs text-ink/40">Kosongkan kolom yang tidak ingin diubah.</p>
                        </div>
                    </div>

                    <div className="space-y-5 px-6 py-6 sm:px-7">
                        <div>
                            <label className="label" htmlFor="username">
                                Username baru
                            </label>
                            <input
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder={user.username}
                                autoComplete="username"
                                className="field"
                            />
                        </div>

                        <div>
                            <label className="label" htmlFor="password">
                                Password baru
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Minimal 6 karakter"
                                    autoComplete="new-password"
                                    className="field pr-24"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow((prev) => !prev)}
                                    className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2.5 text-[11px] font-semibold text-brand-700 transition hover:bg-brand-50"
                                >
                                    {show ? 'Sembunyikan' : 'Lihat'}
                                </button>
                            </div>
                            <p className="hint mt-2">Gunakan kombinasi huruf dan angka agar lebih aman.</p>
                        </div>

                        {error && (
                            <p className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
                                <KeyRound className="h-3.5 w-3.5 shrink-0" />
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 border-t border-ink/5 bg-cream/40 px-6 py-4 sm:px-7">
                        <button type="submit" className="btn-primary px-6 py-2.5 text-xs">
                            <Save className="h-3.5 w-3.5" />
                            Simpan akun
                        </button>
                        <p className="hint hidden sm:block">Perubahan berlaku untuk login berikutnya.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
