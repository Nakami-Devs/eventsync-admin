import { Layout } from "./Layout.tsx";
import { Admin, Resource } from "react-admin";
import { createTheme } from '@mui/material/styles';
import { dataProvider } from "./dataProvider.ts";
import { RoomsList, RoomCreate, RoomEdit } from "./rooms/index.ts";
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
            default: '#0f1729', // Dark blue navy
            paper: '#1a2744',
        },
        primary: {
            main: '#a78bfa', // Purple button
            light: '#c4b5fd',
            dark: '#9370db',
        },
        secondary: {
            main: '#06b6d4', // Cyan
        },
        error: {
            main: '#ef4444', // Red delete button
        },
        text: {
            primary: '#e6eef6',
            secondary: '#9aa6b2',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#a78bfa',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#9370db',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#06b6d4',
                },
            },
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e0f7fa', // Light cyan sky
            paper: '#ffffff',
        },
        primary: {
            main: '#0284c7', // Blue
            light: '#06b6d4',
            dark: '#0369a1',
        },
        secondary: {
            main: '#06b6d4', // Cyan
        },
        error: {
            main: '#ef4444', // Red delete button
        },
        text: {
            primary: '#0f172a',
            secondary: '#475569',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#0369a1',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#0284c7',
                },
            },
        },
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
                    create={RoomCreate}
                    edit={RoomEdit}
                />
            </Admin>
        </ThemeToggleContext.Provider>
    )
}

export default App
