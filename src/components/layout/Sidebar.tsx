import {Sidebar as RASidebar, Menu} from "react-admin";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, styled, Typography } from "@mui/material"
import {useTheme} from "../../hooks/useTheme.ts";
import { useLocation } from "react-router-dom";

const StyledSidebar = styled(RASidebar)(({ theme }) => ({
  '& .RaSidebar-drawer': {
    backgroundColor: '#1a1b3e',
    color: 'white',
    width: 280,
    '& .MuiPaper-root': {
      backgroundColor: '#1a1b3e',
      color: 'white',
      borderRight: 'none',
    }
  }
}));

const StyledMenuItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '8px',
  margin: '2px 12px',
  transition: 'all 0.2s ease',
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    color: 'white',
  },
  '& svg': {
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'color 0.2s ease',
  },
  '&:hover svg': {
    color: 'white',
  }
}));


const MenuItem = ({ primaryText, leftIcon, onClick, isActive }: any) => (
    <StyledMenuItem
        onClick={onClick}
        style={{
        backgroundColor: isActive ? 'rgba(124, 58, 237, 0.25)' : 'transparent',
        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
        }}
    >
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {leftIcon}
        </Box>
        <span style={{ fontSize: '0.95rem' }}>{primaryText}</span>
    </StyledMenuItem>
)

export const Sidebar = (props: any) => {

    const {toggleTheme} = useTheme();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = '/';
    }

    const handleBackToSite = () => {
        window.location.href = 'http://localhost:3000/'
    }

    return(
    <StyledSidebar {...props}>
        <Box 
            sx={{ 
                p: 3, 
                textAlign: 'center', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                mb: 2
            }}
        >
            <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ 
                color: 'white',
                letterSpacing: '1px',
                mb: 0.5
                }}
            >
                EventSync
            </Typography>
            <Typography 
                variant="caption" 
                sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.7rem'
                }}
            >
                Administration
            </Typography>
        </Box>

        <Box sx={{ mt: 1}}>
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
                    selected={location.pathname.includes('/events')}
                />
                <Menu.Item
                    to="/speakers"
                    primaryText="Intervenants"
                    leftIcon={<PeopleIcon/>}
                    selected={location.pathname.includes('/speakers')}
                />
                <Menu.Item
                    to="/rooms"
                    primaryText="Salles"
                    leftIcon={<MeetingRoomIcon/>}
                    selected={location.pathname.includes('/rooms')}
                />
            </Menu>
        </Box>

        <Divider sx={{ 
            my: 2, 
            mx: 3, 
            borderColor: 'rgba(255, 255, 255, 0.1)' 
        }} />

        <Box sx={{mt: 1}}>
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
        </Box>
    </StyledSidebar>
    )
}