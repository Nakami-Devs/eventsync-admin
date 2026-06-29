import {
  Show,
  TopToolbar,
  EditButton,
  ListButton,
  useRecordContext,
  useRedirect,
} from 'react-admin'
import {
  Box, Card, CardContent, Chip, Typography,
  Divider, Stack, Avatar,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import PeopleIcon from '@mui/icons-material/People'

const SessionShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
)

const getStatutSession = (start: string, end: string) => {
  const now = new Date()
  const debut = new Date(start)
  const fin = new Date(end)
  if (now < debut) return { label: 'À venir', color: '#3b82f6', bg: '#1e3a5f' }
  if (now > fin)   return { label: 'Terminée', color: '#8b8fa8', bg: '#2a2840' }
  return { label: 'En cours', color: '#22c55e', bg: '#14532d' }
}

const SessionContent = () => {
  const record = useRecordContext()
  const redirect = useRedirect()

  if (!record) return null

  const statut = getStatutSession(record.start_time, record.end_time)

  return (
    <Box sx={{ backgroundColor: '#181622', minHeight: '100vh', p: 4 }}>
      <Card sx={{ background: '#242233', color: 'white', borderRadius: 4, mb: 3, boxShadow: '0 8px 24px rgba(0,0,0,.25)' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h4" fontWeight="bold">
              {record.title}
            </Typography>
            <Chip
              label={statut.label}
              size="small"
              sx={{ bgcolor: statut.bg, color: statut.color, fontWeight: 700 }}
            />
          </Box>

          <Typography sx={{ color: '#C8C8D3', lineHeight: 1.9, mb: 3 }}>
            {record.description || 'Aucune description disponible.'}
          </Typography>

          <Divider sx={{ bgcolor: '#3D3A52', mb: 3 }} />

          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon sx={{ fontSize: '0.95rem', color: '#8b8fa8' }} />
              <Typography variant="body2" sx={{ color: '#C8C8D3' }}>
                {new Date(record.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                {' — '}
                {new Date(record.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>

            {record.room_name && (
              <Box
                display="flex" alignItems="center" gap={0.5}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                onClick={() => redirect(`/rooms/${record.id_room}/show`)}
              >
                <MeetingRoomIcon sx={{ fontSize: '0.95rem', color: '#8b8fa8' }} />
                <Typography variant="body2" sx={{ color: '#a78bfa', fontWeight: 600 }}>
                  {record.room_name}
                </Typography>
              </Box>
            )}

            {record.capacity && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <PeopleIcon sx={{ fontSize: '0.95rem', color: '#8b8fa8' }} />
                <Typography variant="body2" sx={{ color: '#C8C8D3' }}>
                  {record.capacity} places
                </Typography>
              </Box>
            )}
          </Stack>

          {record.speakers?.length > 0 && (
            <Box mt={3}>
              <Divider sx={{ bgcolor: '#3D3A52', mb: 2 }} />
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {record.speakers.map((speaker: any) => (
                  <Box
                    key={speaker.id}
                    display="flex" alignItems="center" gap={1}
                    onClick={() => redirect(`/speakers/${speaker.id}/show`)}
                    sx={{
                      cursor: 'pointer',
                      p: 1, borderRadius: 2,
                      border: '1.5px solid #3D3A52',
                      '&:hover': { borderColor: '#7c3aed', background: '#2a2550' },
                      transition: 'all 0.2s',
                    }}
                  >
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem', bgcolor: '#5B3FD6' }}>
                      {speaker.full_name?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#a78bfa' }}>
                      {speaker.full_name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export const SessionShow = () => (
  <Show actions={<SessionShowActions />}>
    <SessionContent />
  </Show>
)