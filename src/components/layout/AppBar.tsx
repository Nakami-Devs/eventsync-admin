import { AppBar as RAAppBar, TitlePortal } from 'react-admin';
import { Box, IconButton, Tooltip } from "@mui/material"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "../../hooks/useTheme";


export const AppBar = (props: any) => {
    const {mode, toggleTheme} = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = '/';
    }

    const handleBackToSite = () => {
        window.location.href = 'http://localhost:3000/'
    }

    return(
        <RAAppBar {...props}>
            <TitlePortal />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center"}}>
                <Tooltip title="Thème">
                    <IconButton color='inherit' onClick={toggleTheme}>
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Retour au site">
                    <IconButton color='inherit' onClick={handleBackToSite}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Déconnexion">
                    <IconButton color='inherit' onClick={handleLogout}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </RAAppBar>
    )
}