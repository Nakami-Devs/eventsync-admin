import { Box, Typography, Stack, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import type { SessionFormData } from './SessionDialog'

interface SessionDraftCardProps {
  session: SessionFormData
  roomName?: string
  onRemove: () => void
}

export const SessionDraftCard = ({ session, roomName, onRemove }: SessionDraftCardProps) => (
  <Box sx={{
    background: '#2E2B42',
    borderRadius: '12px',
    p: 2,
    border: '1.5px solid #3D3A52',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <Box>
      <Typography fontWeight={600} color="white" mb={0.5}>
        {session.title}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccessTimeIcon sx={{ fontSize: '0.8rem', color: '#8b8fa8' }} />
          <Typography variant="body2" sx={{ color: '#8b8fa8' }}>
            {session.start_time
              ? new Date(session.start_time).toLocaleString('fr-FR', {
                  day: 'numeric', month: 'short',
                  hour: '2-digit', minute: '2-digit',
                })
              : '—'}
          </Typography>
        </Box>
        {roomName && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <MeetingRoomIcon sx={{ fontSize: '0.8rem', color: '#8b8fa8' }} />
            <Typography variant="body2" sx={{ color: '#8b8fa8' }}>
              {roomName}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
    <Button
      size="small"
      onClick={onRemove}
      sx={{
        color: '#ef4444', minWidth: 0, p: 1, borderRadius: '8px',
        '&:hover': { background: '#2d1515' },
      }}
    >
      <DeleteIcon fontSize="small" />
    </Button>
  </Box>
)
