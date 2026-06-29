import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Divider, Typography } from '@mui/material'
import { useTheme as useMuiTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

interface MenuItemProps {
  primaryText: string
  leftIcon: React.ReactNode
  onClick: () => void
  isActive?: boolean
  danger?: boolean
  activeColor: string
  inactiveColor: string
  activeBg: string
  hoverBg: string
}

const MenuItem = ({
  primaryText,
  leftIcon,
  onClick,
  isActive,
  danger,
  activeColor,
  inactiveColor,
  activeBg,
  hoverBg,
}: MenuItemProps) => (
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
      backgroundColor: isActive ? activeBg : 'transparent',
      color: danger ? '#ef4444' : isActive ? activeColor : inactiveColor,
      '&:hover': {
        backgroundColor: danger ? 'rgba(239,68,68,0.1)' : isActive ? activeBg : hoverBg,
        color: danger ? '#f87171' : activeColor,
        '& svg': { color: danger ? '#f87171' : activeColor },
      },
      '& svg': {
        color: danger ? '#ef4444' : isActive ? activeColor : inactiveColor,
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
  const muiTheme = useMuiTheme()
  const isDark = muiTheme.palette.mode === 'dark'

  const SIDEBAR_BG = isDark ? '#1a1b3e' : '#f8f8ff'
  const ACCENT = '#7c3aed'
  const BORDER_COLOR = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const ACTIVE_BG = 'rgba(124, 58, 237, 0.25)'
  const ACTIVE_COLOR = isDark ? '#ffffff' : '#1a1b3e'
  const INACTIVE_COLOR = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)'
  const HOVER_BG = 'rgba(124, 58, 237, 0.15)'

  const menuItemProps = {
    activeColor: ACTIVE_COLOR,
    inactiveColor: INACTIVE_COLOR,
    activeBg: ACTIVE_BG,
    hoverBg: HOVER_BG,
  }

  const { toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    window.location.href = '/'
  }

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/events', label: 'Événements', icon: <EventIcon /> },
    { to: '/speakers', label: 'Intervenants', icon: <PeopleIcon /> },
    { to: '/rooms', label: 'Salles', icon: <MeetingRoomIcon /> },
  ]

  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        height: '100vh',
        backgroundColor: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER_COLOR}`,
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
          borderBottom: `1px solid ${BORDER_COLOR}`,
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
            sx={{
              color: isDark ? 'white' : '#1a1b3e',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.2,
            }}
          >
            EventSync
          </Typography>
          <Typography
            sx={{
              color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
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
            {...menuItemProps}
          />
        ))}
      </Box>

      <Box>
        <Divider sx={{ mx: 3, borderColor: BORDER_COLOR, mb: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pb: 2 }}>
          <MenuItem
            primaryText="Thème"
            leftIcon={<Brightness6Icon />}
            onClick={toggleTheme}
            {...menuItemProps}
          />
          <MenuItem
            primaryText="Retour au site"
            leftIcon={<ArrowBackIcon />}
            onClick={() => { window.location.href = 'http://localhost:3000/' }}
            {...menuItemProps}
          />
          <MenuItem
            primaryText="Déconnexion"
            leftIcon={<LogoutIcon />}
            onClick={handleLogout}
            danger
            {...menuItemProps}
          />
        </Box>
      </Box>
    </Box>
  )
}
