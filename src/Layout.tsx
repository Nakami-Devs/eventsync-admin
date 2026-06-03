// @ts-nocheck
import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, useLogout } from "react-admin";
import { Box, IconButton, Tooltip, Button, Link } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Logout as LogoutIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeToggleContext } from './App';

export const Layout = ({ children }: { children: ReactNode }) => {
    const { themeName, toggle } = useContext(ThemeToggleContext);
    const logout = useLogout();

    return (
        <RALayout>
            {children}
            <CheckForApplicationUpdate />

            <Box className="sidebar-branding" sx={{ position: 'fixed', left: 12, top: 12, display: 'flex', alignItems: 'center', gap: 12, zIndex: 1400 }}>
                <Box className="logo-fake" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ color: '#e6eef6', fontWeight: 700 }}>EventSync</Box>
                    <Box sx={{ color: '#9aa6b2', fontSize: 12 }}>Administration</Box>
                </Box>
            </Box>

            <Box sx={{ position: 'fixed', left: 12, bottom: 24, zIndex: 1400, width: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: '#cbd5e1', fontSize: 13 }}>Thème</Box>
                    </Box>
                    <Tooltip title={themeName === 'dark' ? 'Passer en light' : 'Passer en night'}>
                        <IconButton onClick={toggle} color="inherit" sx={{ bgcolor: themeName === 'dark' ? '#0f172a' : '#fff', width: 40, height: 40, borderRadius: 2 }}>
                            {themeName === 'dark' ? <Brightness7Icon sx={{ color: '#f8fafc' }} /> : <Brightness4Icon sx={{ color: '#0f172a' }} />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box sx={{ borderTop: '1px solid rgba(148,163,184,0.04)', pt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', mb: 1 }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                        <Link href="#" underline="none" sx={{ color: '#cbd5e1' }}>Retour au site</Link>
                    </Box>

                    <Button startIcon={<LogoutIcon />} onClick={() => logout()} sx={{ color: '#ef4444', textTransform: 'none' }}>
                        Déconnexion
                    </Button>
                </Box>
            </Box>
        </RALayout>
    );
};
