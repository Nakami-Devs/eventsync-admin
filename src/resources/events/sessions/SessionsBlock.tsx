import { Card, CardContent, Typography, Chip, Divider, Box, CircularProgress, Stack, Avatar, useTheme } from "@mui/material"
import { useRecordContext, useRedirect, useGetManyReference } from "react-admin"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"

export const SessionsBlock = () => {
  const record = useRecordContext()
  const redirect = useRedirect()
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"
  const bgCard = isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF"
  const bgItem = isDark ? "rgba(255,255,255,0.05)" : "#F4F4F8"
  const borderCol = isDark ? "rgba(255,255,255,0.10)" : "#E0DFF0"
  const textColor = isDark ? "#FAFAFA" : theme.palette.text.primary
  const subText = isDark ? "#94a3b8" : theme.palette.text.secondary
  const divider = isDark ? "rgba(255,255,255,0.10)" : "#E0DFF0"
  const bgChipVoir = isDark ? "rgba(139,92,246,0.35)" : "#EDE9FF"

  const { data: sessions = [], isLoading } = useGetManyReference('sessions', {
    target: 'id_event',
    id: record?.id,
    pagination: { page: 1, perPage: 50 },
    sort: { field: 'start_time', order: 'ASC' },
  })

  return (
    <Card sx={{ background: bgCard, color: textColor, borderRadius: 4, mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2} display="flex" alignItems="center" gap={1} color={textColor}>
          <VideocamIcon />
          Sessions
          <Chip
            label={sessions.length}
            size="small"
            sx={{ bgcolor: '#5B3FD6', color: 'white', fontWeight: 700, ml: 1 }}
          />
        </Typography>

        <Divider sx={{ bgcolor: divider, mb: 3 }} />

        {isLoading && (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress size={24} sx={{ color: '#7c3aed' }} />
          </Box>
        )}

        {!isLoading && sessions.length === 0 && (
          <Typography sx={{ color: subText }}>
            Aucune session pour cet événement.
          </Typography>
        )}

        {!isLoading && sessions.length > 0 && (
          <Stack spacing={2}>
            {sessions.map((session: any) => (
              <Box
                key={session.id}
                sx={{
                  background: bgItem,
                  borderRadius: 3,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1.5px solid ${borderCol}`,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#7c3aed' },
                }}
                onClick={() => redirect(`/sessions/${session.id}/show`)}
              >
                <Box>
                  <Typography fontWeight={600} mb={0.5} color={textColor}>
                    {session.title}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AccessTimeIcon sx={{ fontSize: '0.85rem', color: subText }} />
                      <Typography variant="body2" sx={{ color: subText }}>
                        {new Date(session.start_time).toLocaleString('fr-FR', {
                          day: 'numeric', month: 'short',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </Typography>
                    </Box>

                    {session.id_room && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <MeetingRoomIcon sx={{ fontSize: '0.85rem', color: subText }} />
                        <Typography variant="body2" sx={{ color: subText }}>
                          {session.room_name ?? session.id_room}
                        </Typography>
                      </Box>
                    )}

                    {session.speakers?.length > 0 && (
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        {session.speakers.map((speaker: any) => (
                          <Box
                            key={speaker.id}
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                            onClick={(e) => {
                              e.stopPropagation()
                              redirect(`/speakers/${speaker.id}/show`)
                            }}
                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                          >
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: '#5B3FD6' }}>
                              {speaker.profile_pic ? (
                                <img src={speaker.profile_pic} alt={speaker.full_name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <span style={{ fontSize: '0.7rem' }}>{speaker.full_name?.charAt(0)}</span>
                              )}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: '#a78bfa' }}>
                              {speaker.full_name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Box>

                <Chip
                  label="Voir"
                  size="small"
                  sx={{ bgcolor: bgChipVoir, color: '#a78bfa', fontWeight: 600, cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}