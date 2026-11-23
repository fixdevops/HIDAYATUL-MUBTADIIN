import { Suspense, lazy, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout';
import { ToastProvider } from './components/Toast';
import { AuthProvider, DataProvider, useAuth } from './lib/store';
import { Home } from './pages/Home';

const Info = lazy(() => import('./pages/Info').then((module) => ({ default: module.Info })));
const Profile = lazy(() => import('./pages/Profile').then((module) => ({ default: module.Profile })));
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

const AdminLayout = lazy(() =>
    import('./components/admin/AdminLayout').then((module) => ({ default: module.AdminLayout })),
);
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then((module) => ({ default: module.Dashboard })));
const AdminHome = lazy(() => import('./pages/admin/AdminHome').then((module) => ({ default: module.AdminHome })));
const InfoAdmin = lazy(() => import('./pages/admin/InfoAdmin').then((module) => ({ default: module.InfoAdmin })));
const ProfilAdmin = lazy(() => import('./pages/admin/Sections').then((module) => ({ default: module.ProfilAdmin })));
const DataAdmin = lazy(() => import('./pages/admin/Sections').then((module) => ({ default: module.DataAdmin })));
const AdminAccount = lazy(() =>
    import('./pages/admin/Account').then((module) => ({ default: module.AdminAccount })),
);
const ResourceForm = lazy(() =>
    import('./pages/admin/ResourceForm').then((module) => ({ default: module.ResourceForm })),
);

function RouteFallback() {
    return (
        <div className="grid min-h-[70vh] place-items-center">
            <div className="flex flex-col items-center gap-4">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/35">Memuat halaman</p>
            </div>
        </div>
    );
}

function RequireAuth({ children }: { children: ReactNode }) {
    const { isAuthed } = useAuth();
    return isAuthed ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <DataProvider>
            <AuthProvider>
                <ToastProvider>
                    <Suspense fallback={<RouteFallback />}>
                        <Routes>
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/informasi" element={<Info />} />
                                <Route path="/profil" element={<Profile />} />
                            </Route>

                            <Route path="/login" element={<Login />} />

                            <Route
                                path="/admin"
                                element={
                                    <RequireAuth>
                                        <AdminLayout />
                                    </RequireAuth>
                                }
                            >
                                <Route index element={<Navigate to="/admin/ringkasan" replace />} />
                                <Route path="ringkasan" element={<Dashboard />} />
                                <Route path="beranda" element={<AdminHome />} />
                                <Route path="informasi" element={<InfoAdmin />} />
                                <Route path="profil" element={<ProfilAdmin />} />
                                <Route path="data" element={<DataAdmin />} />
                                <Route path="akun" element={<AdminAccount />} />
                                <Route path=":res/create" element={<ResourceForm />} />
                                <Route path=":res/:id/edit" element={<ResourceForm />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </ToastProvider>
            </AuthProvider>
        </DataProvider>
    );
}
