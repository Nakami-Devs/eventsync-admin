import { AppBar as RAAppBar, TitlePortal } from 'react-admin';
import { Box, IconButton, Tooltip } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "../../hooks/useTheme";


export const AppBar = (props: any) => {
    const {mode, toggleTheme} = useTheme();

    return(
        <RAAppBar {...props}>
            <TitlePortal />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center"}}>
                <Tooltip title="Thème">
                    <IconButton color='inherit' onClick={toggleTheme}>
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>
            </Box>
        </RAAppBar>
    )
}