import { Box, Typography, Button } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

export const CustomCatchAll = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{
      minHeight:      '100vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      textAlign:      'center',
      px:             2,
      background:     theme => theme.palette.mode === 'dark' ? '#12132A' : '#F0F0F5',
    }}>

     
      <Box sx={{
        width:          72,
        height:         72,
        borderRadius:   '18px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
        boxShadow:      '0 8px 24px rgba(124,58,237,0.4)',
        mb:             3,
      }}>
        <BoltIcon sx={{ color: 'white', fontSize: 36 }} />
      </Box>

      <Typography variant="h2" fontWeight="bold" sx={{
        background:           'linear-gradient(135deg, #7C3AED, #3B82F6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        mb:                   1,
      }}>
        404
      </Typography>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Page introuvable
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360 }}>
        La page d&apos;administration que vous recherchez n&apos;existe pas ou a été déplacée.
      </Typography>

      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}
        sx={{
          borderRadius: '10px',
          px:           3,
          py:           1.2,
          fontWeight:   'bold',
          background:   'linear-gradient(135deg, #7C3AED, #6D28D9)',
          boxShadow:    '0 4px 16px rgba(124,58,237,0.4)',
          '&:hover':    { background: 'linear-gradient(135deg, #6D28D9, #5B21B6)' },
        }}
      >
        Retour au tableau de bord
      </Button>

    </Box>
  )
}