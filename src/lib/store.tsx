import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { seedData } from './seed';
import type { DataValues, HomeContent, Resource, Settings, StoreData } from './types';

const DATA_KEY = 'tpq-data-v2';
const AUTH_KEY = 'tpq-admin-auth';

type Row = { id: number } & Record<string, unknown>;

interface DataContextValue extends StoreData {
    saveHome: (patch: Partial<HomeContent>) => void;
    saveSettings: (patch: Partial<Settings>) => void;
    createItem: (resource: Resource, values: DataValues) => void;
    updateItem: (resource: Resource, id: number, values: DataValues) => void;
    removeItem: (resource: Resource, id: number) => void;
    updateUser: (patch: { username?: string; password?: string }) => void;
}

const DataContext = createContext<DataContextValue | null>(null);
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthContextValue {
    isAuthed: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

function loadData(): StoreData {
    try {
        const raw = localStorage.getItem(DATA_KEY);
        if (raw) {
            const parsed = JSON.parse(raw) as Partial<StoreData>;
            return { ...seedData, ...parsed };
        }
    } catch {
        /* data rusak — kembali ke seed */
    }
    return seedData;
}

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<StoreData>(loadData);

    useEffect(() => {
        try {
            localStorage.setItem(DATA_KEY, JSON.stringify(data));
        } catch {
            /* kuota localStorage habis — data tetap hidup di memori */
        }
    }, [data]);

    const saveHome = useCallback((patch: Partial<HomeContent>) => {
        setData((prev) => ({ ...prev, home: { ...prev.home, ...patch } }));
    }, []);

    const saveSettings = useCallback((patch: Partial<Settings>) => {
        setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
    }, []);

    const createItem = useCallback((resource: Resource, values: DataValues) => {
        setData((prev) => {
            const rows = prev[resource] as unknown as Row[];
            const id = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
            const item: Row = { id, ...values };
            return { ...prev, [resource]: [item, ...rows] } as StoreData;
        });
    }, []);

    const updateItem = useCallback((resource: Resource, id: number, values: DataValues) => {
        setData((prev) => {
            const rows = prev[resource] as unknown as Row[];
            return {
                ...prev,
                [resource]: rows.map((row) => (row.id === id ? { ...row, ...values } : row)),
            } as StoreData;
        });
    }, []);

    const removeItem = useCallback((resource: Resource, id: number) => {
        setData((prev) => {
            const rows = prev[resource] as unknown as Row[];
            const nextData = {
                ...prev,
                [resource]: rows.filter((row) => row.id !== id),
            } as StoreData;
            if (resource === 'classes') {
                nextData.students = prev.students.map((student) =>
                    student.class_id === id ? { ...student, class_id: null } : student,
                );
            }
            return nextData;
        });
    }, []);

    const updateUser = useCallback((patch: { username?: string; password?: string }) => {
        setData((prev) => ({ ...prev, user: { ...prev.user, ...patch } }));
    }, []);

    const value = useMemo<DataContextValue>(
        () => ({
            ...data,
            saveHome,
            saveSettings,
            createItem,
            updateItem,
            removeItem,
            updateUser,
        }),
        [data, saveHome, saveSettings, createItem, updateItem, removeItem, updateUser],
    );

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user } = useData();
    const [isAuthed, setIsAuthed] = useState<boolean>(() => localStorage.getItem(AUTH_KEY) === '1');

    const login = useCallback(
        (username: string, password: string) => {
            const ok = username.trim() === user.username && password === user.password;
            if (ok) {
                localStorage.setItem(AUTH_KEY, '1');
                setIsAuthed(true);
            }
            return ok;
        },
        [user],
    );

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_KEY);
        setIsAuthed(false);
    }, []);

    const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useData(): DataContextValue {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData harus dipakai di dalam DataProvider.');
    return context;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider.');
    return context;
}
