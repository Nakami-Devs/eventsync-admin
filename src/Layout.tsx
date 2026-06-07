// @ts-nocheck
import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, useLogout } from "react-admin";
import { Box, IconButton, Tooltip, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Logout as LogoutIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeToggleContext } from './App';

export const Layout = ({ children }: { children: ReactNode }) => {
    const { themeName, toggle } = useContext(ThemeToggleContext);
    const logout = useLogout();
    const theme = useTheme();

    const isDark = themeName === 'dark';
    const textColor = isDark ? '#e6eef6' : '#0f172a';
    const secondaryTextColor = isDark ? '#9aa6b2' : '#475569';
    const bgColor = isDark ? '#1a2744' : '#ffffff';
    const borderColor = isDark ? 'rgba(148,163,184,0.04)' : 'rgba(2, 132, 199, 0.1)';

    return (
        <RALayout>
            {children}
            <CheckForApplicationUpdate />

            <Box className="sidebar-branding" sx={{ position: 'fixed', left: 12, top: 12, display: 'flex', alignItems: 'center', gap: 12, zIndex: 1400 }}>
                <Box className="logo-fake" />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ color: textColor, fontWeight: 700 }}>EventSync</Box>
                    <Box sx={{ color: secondaryTextColor, fontSize: 12 }}>Administration</Box>
                </Box>
            </Box>

            <Box sx={{ position: 'fixed', left: 12, bottom: 24, zIndex: 1400, width: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: secondaryTextColor, fontSize: 13 }}>Thème</Box>
                    </Box>
                    <Tooltip title={themeName === 'dark' ? 'Passer en light' : 'Passer en night'}>
                        <IconButton onClick={toggle} color="inherit" sx={{ bgcolor: bgColor, color: textColor, width: 40, height: 40, borderRadius: 2, border: `1px solid ${borderColor}` }}>
                            {themeName === 'dark' ? <Brightness7Icon sx={{ color: textColor }} /> : <Brightness4Icon sx={{ color: textColor }} />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box sx={{ borderTop: `1px solid ${borderColor}`, pt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: secondaryTextColor, mb: 1 }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                        <Link href="#" underline="none" sx={{ color: secondaryTextColor, '&:hover': { color: textColor } }}>Retour au site</Link>
                    </Box>

                    <Button startIcon={<LogoutIcon />} onClick={() => logout()} sx={{ color: '#ef4444', textTransform: 'none', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}>
                        Déconnexion
                    </Button>
                </Box>
            </Box>
        </RALayout>
    );
};
