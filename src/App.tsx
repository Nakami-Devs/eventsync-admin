import './App.css'
import { Layout } from "./Layout.tsx";
import { Admin, Resource } from "react-admin";
import { createTheme } from '@mui/material/styles';
import { dataProvider } from "./dataProvider.ts";
import { RoomsList, RoomsCreate, RoomsEdit } from "./rooms/index.ts";
import { createContext, useEffect, useMemo, useState } from 'react';

type ThemeName = 'dark' | 'light';

export const ThemeToggleContext = createContext({
    themeName: 'dark' as ThemeName,
    toggle: (() => { }) as () => void,
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#090e21',
            paper: '#0f172a',
        },
        primary: {
            main: '#7c3aed',
        },
        secondary: {
            main: '#f97316',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e0f2fe',
            paper: '#ffffff',
        },
        primary: {
            main: '#0284c7',
        },
        secondary: {
            main: '#0ea5e9',
        },
        text: {
            primary: '#0f172a',
            secondary: '#475569',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
});

function App() {
    const [themeName, setThemeName] = useState<ThemeName>(() => {
        try {
            return (localStorage.getItem('theme') as ThemeName) || 'dark';
        } catch {
            return 'dark';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('theme', themeName);
            document.documentElement.setAttribute('data-theme', themeName);
        } catch { }
    }, [themeName]);

    const currentTheme = useMemo(() => (themeName === 'dark' ? darkTheme : lightTheme), [themeName]);

    const toggle = () => setThemeName(prev => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeToggleContext.Provider value={{ themeName, toggle }}>
            <Admin
                layout={Layout}
                theme={currentTheme}
                dataProvider={dataProvider}
                loginPage={false}
            >
                <Resource
                    name="events"
                >
                </Resource>
                <Resource
                    name="rooms"
                    list={RoomsList}
                    create={RoomsCreate}
                    edit={RoomsEdit}
                />
            </Admin>
        </ThemeToggleContext.Provider>
    )
}

export default App
