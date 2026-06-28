import {Sidebar as RASidebar, Menu} from "react-admin";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, Typography } from "@mui/material"
import {useTheme} from "../../hooks/useTheme.ts";

const MenuItem = ({ primaryText, leftIcon, onClick }: any) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '8px',
            margin: '4px 8px',
            transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
        }}
    >
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {leftIcon}
        </Box>
        <span>{primaryText}</span>
    </div>
)

export const Sidebar = (props: any) => {

    const {toggleTheme} = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = '/';
    }

    const handleBackToSite = () => {
        window.location.href = 'http://localhost:3000/'
    }

    return(
    <RASidebar {...props}>
        <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" fontWeight="bold">
                EventSync
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Administration
            </Typography>
        </Box>

        <Menu>
            <Menu.Item
                to="/"
                primaryText="Dashboard"
                leftIcon={<DashboardIcon/>}
            />
            <Menu.Item
                to="/events"
                primaryText="Événements"
                leftIcon={<EventIcon/>}
            />
            <Menu.Item
                to="/speakers"
                primaryText="Intervenants"
                leftIcon={<PeopleIcon/>}
            />
            <Menu.Item
                to="/rooms"
                primaryText="Salles"
                leftIcon={<MeetingRoomIcon/>}
            />

            <Divider sx={{ my: 1 }} />

            <MenuItem
                primaryText="Thème"
                leftIcon={<SettingsBrightnessIcon />}
                onClick={toggleTheme}
            />
            <MenuItem
                primaryText="Retour au site"
                leftIcon={<ArrowBackIcon />}
                onClick={handleBackToSite}
            />
            <MenuItem
                primaryText="Déconnexion"
                leftIcon={<LogoutIcon />}
                onClick={handleLogout}
            />
        </Menu>
    </RASidebar>
    )
}