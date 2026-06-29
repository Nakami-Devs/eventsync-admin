import { Box, Typography } from '@mui/material'

export const CustomLoading = () => (
  <Box
    sx={{
      minHeight:      '100vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            2,
      background:     theme => theme.palette.mode === 'dark' ? '#12132A' : '#F0F0F5',
    }}
  >
    
    <Box
      sx={{
        width:          56,
        height:         56,
        borderRadius:   '50%',
        border:         '4px solid rgba(124,58,237,0.15)',
        borderTopColor: '#7C3AED',
        animation:      'spin 0.8s linear infinite',
        '@keyframes spin': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
    <Typography variant="body2" color="text.secondary" fontWeight={500}>
      Chargement
    </Typography>
  </Box>
)
  