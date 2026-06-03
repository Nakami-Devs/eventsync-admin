import {
  List, useListContext, RecordContextProvider,
  DeleteWithConfirmButton, EditButton, useRedirect
} from 'react-admin'
import { Grid, Card, CardContent, Avatar, Typography, Box } from '@mui/material'


const SpeakerGrid = () => {
  const { data, isPending } = useListContext()
  const redirect = useRedirect()

  if (isPending) return (
    <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
      Chargement...
    </Box>
  )

  if (!data || data.length === 0) return (
    <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
      Aucun intervenant trouvé.
    </Box>
  )

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {data.map(speaker => (
        <Grid item xs={12} sm={6} md={4} key={speaker.id}>
          <RecordContextProvider value={speaker}>
            <Card sx={{
              borderRadius: '12px',
              border:       '1px solid',
              borderColor:  'divider',
              boxShadow:    '0 2px 8px rgba(0,0,0,0.08)',
              transition:   'all 0.2s',
              '&:hover':    { boxShadow: '0 4px 16px rgba(124,58,237,0.15)', borderColor: '#7C3AED' }
            }}>
              <CardContent>

               
                <Box
                  onClick={() => redirect('show', 'speakers', speaker.id)}
                  sx={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        2,
                    mb:         2,
                    cursor:     'pointer',
                    '&:hover':  { opacity: 0.85 }
                  }}
                >
                  <Avatar
                    src={speaker.profile_pic}
                    alt={speaker.full_name}
                    sx={{ width: 60, height: 60, border: '2px solid #7C3AED' }}
                  />
                  <Box>
                    <Typography sx={{
                      fontWeight: 'bold',
                      fontSize:   '15px',
                      color:      'text.primary' 
                    }}>
                      {speaker.full_name}
                    </Typography>
                    <Typography sx={{
                      fontSize: '13px',
                      color:    'text.secondary'
                    }}>
                      {speaker.sessions?.length ?? 0} sessions
                    </Typography>
                    <Typography sx={{
                      fontSize:  '11px',
                      color:     '#7C3AED',
                      fontStyle: 'italic',
                      mt:        0.5
                    }}>
                    </Typography>
                  </Box>
                </Box>

               
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <EditButton
                    label="Modifier"
                    sx={{
                      flex:         1,
                      border:       '1px solid',
                      borderColor:  'divider',
                      color:        'text.primary',
                      borderRadius: '8px',
                      fontWeight:   'bold',
                      '&:hover':    { background: 'rgba(124,58,237,0.08)', borderColor: '#7C3AED' }
                    }}
                  />
                  <DeleteWithConfirmButton
                    confirmTitle="Supprimer l'intervenant ?"
                    confirmContent="Êtes-vous sûr ? Cette action est irréversible."
                    label=""
                    sx={{
                      background:   '#DC2626',
                      color:        'white',
                      borderRadius: '8px',
                      minWidth:     '44px',
                      '&:hover':    { background: '#B91C1C' }
                    }}
                  />
                </Box>

              </CardContent>
            </Card>
          </RecordContextProvider>
        </Grid>
      ))}
    </Grid>
  )
}

export const SpeakerList = () => (
  <List
    sx={{
      '& .RaList-content': { background: 'transparent', boxShadow: 'none' },
      '& .MuiToolbar-root': { background: 'transparent' }
    }}
  >
    <SpeakerGrid />
  </List>
)