import { Box, Typography, Stack, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

interface SessionCardProps {
  session: any
  roomName?: string
  onEdit: () => void
  onDelete: () => void
}

export const SessionCard = ({ session, roomName, onEdit, onDelete }: SessionCardProps) => (
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
            {new Date(session.start_time).toLocaleString('fr-FR', {
              day: 'numeric', month: 'short',
              hour: '2-digit', minute: '2-digit',
            })}
          </Typography>
        </Box>
        {(roomName || session.room_name) && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <MeetingRoomIcon sx={{ fontSize: '0.8rem', color: '#8b8fa8' }} />
            <Typography variant="body2" sx={{ color: '#8b8fa8' }}>
              {roomName ?? session.room_name}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>

    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        onClick={onEdit}
        sx={{
          color: '#a78bfa', minWidth: 0, p: 1, borderRadius: '8px',
          border: '1.5px solid #3d3560',
          '&:hover': { background: '#2a2550' },
        }}
      >
        <EditIcon fontSize="small" />
      </Button>
      <Button
        size="small"
        onClick={onDelete}
        sx={{
          color: '#ef4444', minWidth: 0, p: 1, borderRadius: '8px',
          border: '1.5px solid #3d2020',
          '&:hover': { background: '#2d1515' },
        }}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </Stack>
  </Box>
)
