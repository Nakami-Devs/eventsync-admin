import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider,  Typography } from "@mui/material"
import {useTheme} from "../../hooks/useTheme.ts";
import { useLocation, useNavigate } from "react-router-dom";

const SIDEBAR_BG = '#1a1b3e'
const ACTIVE_BG = 'rgba(124, 58, 237, 0.25)'
const ACTIVE_COLOR = '#ffffff'
const INACTIVE_COLOR = 'rgba(255, 255, 255, 0.65)'
const HOVER_BG = 'rgba(124, 58, 237, 0.15)'
const ACCENT = '#7c3aed'

interface MenuItemProps {
  primaryText: string
  leftIcon: React.ReactNode
  onClick: () => void
  isActive?: boolean
  danger?: boolean
}

const MenuItem = ({ primaryText, leftIcon, onClick, isActive, danger }: MenuItemProps) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      px: 2.5,
      py: 1.25,
      mx: 1.5,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? ACTIVE_BG : 'transparent',
      color: danger ? '#ef4444' : isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
      '&:hover': {
        backgroundColor: danger ? 'rgba(239,68,68,0.1)' : isActive ? ACTIVE_BG : HOVER_BG,
        color: danger ? '#f87171' : ACTIVE_COLOR,
        '& svg': { color: danger ? '#f87171' : ACTIVE_COLOR },
      },
      '& svg': {
        color: danger ? '#ef4444' : isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
        fontSize: '1.25rem',
        transition: 'color 0.2s ease',
      },
    }}
  >
    <Box sx={{ mr: 1.75, display: 'flex', alignItems: 'center' }}>{leftIcon}</Box>
    <Typography sx={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 400, lineHeight: 1 }}>
      {primaryText}
    </Typography>
  </Box>
)

export const Sidebar = () => {

    const { toggleTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = '/';
    }

    const navItems = [
    { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/events', label: 'Événements', icon: <EventIcon /> },
    { to: '/speakers', label: 'Intervenants', icon: <PeopleIcon /> },
    { to: '/rooms', label: 'Salles', icon: <MeetingRoomIcon /> },
    ]

    return(
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        height: '100vh',
        backgroundColor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${ACCENT}, #a855f7)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <EventIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
        </Box>
        <Box>
          <Typography
            sx={{ color: 'white', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}
          >
            EventSync
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Administration
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, pt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {navItems.map((item) => (
          <MenuItem
            key={item.to}
            primaryText={item.label}
            leftIcon={item.icon}
            onClick={() => navigate(item.to)}
            isActive={isActive(item.to)}
          />
        ))}
      </Box>

      <Box>
        <Divider sx={{ mx: 3, borderColor: 'rgba(255,255,255,0.08)', mb: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pb: 2 }}>
          <MenuItem
            primaryText="Thème"
            leftIcon={<Brightness6Icon />}
            onClick={toggleTheme}
          />
          <MenuItem
            primaryText="Retour au site"
            leftIcon={<ArrowBackIcon />}
            onClick={() => { window.location.href = 'http://localhost:3000/' }}
          />
          <MenuItem
            primaryText="Déconnexion"
            leftIcon={<LogoutIcon />}
            onClick={handleLogout}
            danger
          />
        </Box>
      </Box>
    </Box>
    )
}