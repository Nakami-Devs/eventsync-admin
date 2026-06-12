import { useState } from 'react'
import { useLogin, useNotify } from 'react-admin'
import {
  Box, Button, TextField, Typography,
  Paper, IconButton, InputAdornment
} from '@mui/material'
import {
  Visibility, VisibilityOff,
  ArrowBack, Bolt, ArrowForward
} from '@mui/icons-material'

export const CustomLoginPage = () => {
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const login  = useLogin()
  const notify = useNotify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
     
      await login({ username: email, password })
    } catch {
      setError('Email ou mot de passe incorrect')
      notify('Email ou mot de passe incorrect', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight:       '100vh',
      background:      'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      position:        'relative',
    }}>

     
      <Box sx={{ position: 'absolute', top: 24, left: 24 }}>
        <Button
          href="http://localhost:3000"
          startIcon={<ArrowBack fontSize="small" />}
          sx={{
            color:        'rgba(255,255,255,0.8)',
            border:       '1px solid rgba(255,255,255,0.25)',
            borderRadius: '20px',
            px:           2,
            py:           0.8,
            fontSize:     '13px',
            backdropFilter: 'blur(8px)',
            background:   'rgba(255,255,255,0.05)',
            '&:hover':    {
              background: 'rgba(255,255,255,0.12)',
              color:      'white'
            }
          }}
        >
          Retour au site
        </Button>
      </Box>

      
      <Paper
        elevation={0}
        sx={{
          width:        '100%',
          maxWidth:     420,
          mx:           2,
          p:            4,
          borderRadius: '16px',
          background:   theme =>
            theme.palette.mode === 'dark'
              ? 'rgba(26,27,53,0.95)'
              : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          border:       theme =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.08)',
          boxShadow:    '0 25px 50px rgba(0,0,0,0.4)',
        }}
      >

        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{
            width:          64,
            height:         64,
            borderRadius:   '16px',
            background:     'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            mb:             2,
            boxShadow:      '0 8px 24px rgba(124,58,237,0.4)',
          }}>
            <Bolt sx={{ color: 'white', fontSize: 32 }} />
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
            Administration
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Connectez-vous pour gérer vos événements
          </Typography>
        </Box>

        
        <Box component="form" onSubmit={handleSubmit}>

          
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            required
            placeholder="admin@eventsync.com"
            sx={{ mb: 1 }}
          />

          
          <TextField
            fullWidth
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

         
          {error && (
            <Box sx={{
              mt:           1.5,
              p:            1.5,
              borderRadius: '8px',
              background:   'rgba(220,38,38,0.1)',
              border:       '1px solid rgba(220,38,38,0.3)',
            }}>
              <Typography color="error" variant="body2" textAlign="center">
                {error}
              </Typography>
            </Box>
          )}

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            endIcon={<ArrowForward />}
            sx={{
              mt:           3,
              py:           1.5,
              borderRadius: '10px',
              fontWeight:   'bold',
              fontSize:     '15px',
              background:   'linear-gradient(135deg, #7C3AED, #6D28D9)',
              boxShadow:    '0 4px 16px rgba(124,58,237,0.4)',
              '&:hover':    {
                background: 'linear-gradient(135deg, #6D28D9, #5B21B6)',
                boxShadow:  '0 6px 20px rgba(124,58,237,0.5)',
              },
              '&:disabled': { opacity: 0.7 }
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>

        </Box>
      </Paper>
    </Box>
  )
}