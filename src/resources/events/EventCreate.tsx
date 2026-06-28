import {
  Create,
  useCreate,
  useGetList,
  useNotify,
  useRedirect,
  Button,
} from "react-admin";
import { SessionDialog, type SessionFormData } from "./components/SessionDialog";
import { useState } from "react";
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import { EventFormFields } from "./components/EventFormFields";
import { SessionDraftCard } from "./components/SessionDraftCard";
import VideocamIcon from '@mui/icons-material/Videocam'
import AddIcon from '@mui/icons-material/Add'

const EventCreateForm = () => {
  const [create] = useCreate()
  const notify = useNotify()
  const redirect = useRedirect()
  const { data: rooms = [] } = useGetList(
    'rooms', 
    { pagination: { page: 1, perPage: 100 } }
  )

  const [form, setForm] = useState({
      title: '', description: '', start_date: '', end_date: '', place: '',
    })
    const [sessions, setSessions] = useState<SessionFormData[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
  
    const isValid = form.title && form.description && form.start_date && form.end_date && form.place
  
     const handleChange = (field: string, value: string) =>
        setForm(f => ({ ...f, [field]: value }))
    
      const handleAddSession = (session: SessionFormData) => {
        const isDuplicate = sessions.some(
          s => s.title === session.title && s.start_time === session.start_time
        )
        if (isDuplicate) {
          notify('Une session avec ce titre et cet horaire existe déjà', { type: 'warning' })
          return
        }
        setSessions(prev => [...prev, session])
        setDialogOpen(false)
      }
    
      const handleRemoveSession = (index: number) =>
        setSessions(prev => prev.filter((_, i) => i !== index))
    
      const handleSubmit = async () => {
        if (!isValid) return

        const start = new Date(form.start_date)
        const end = new Date(form.end_date)
        const now = new Date()
        
        if (start >= end) {
          notify('La date de fin doit être après la date de début', { type: 'warning' })
          return
        }

         if (start < now) {
          notify('Impossible de créer un événement dans le passé', { type: 'warning' })
          return
        }

        const invalidSessions = sessions.filter(s => {
        const sStart = new Date(s.start_time)
        const sEnd = new Date(s.end_time)
        return sStart < start || sEnd > end
        })
        
        if (invalidSessions.length > 0) {
          notify(`Certaines sessions sont en dehors des dates de l'événement`, { type: 'warning' })
          return
        }

        setSubmitting(true)

        try {
          const event: any = await new Promise((resolve, reject) => {
            create('events', { data: form }, { onSuccess: resolve, onError: reject })
          })
    
          await Promise.all(
            sessions.map(s =>
              new Promise<void>((resolve, reject) => {
                create(
                  'sessions',
                  {
                    data: {
                      ...s,
                      id_event: event.id,
                      start_time: new Date(s.start_time).toISOString(),
                      end_time: new Date(s.end_time).toISOString(),
                    }
                  },
                  { onSuccess: () => resolve(), onError: reject }
                )
              })
            )
          )
    
          notify(
            sessions.length > 0
              ? `Événement créé avec ${sessions.length} session(s)`
              : 'Événement créé',
            { type: 'success' }
          )
          redirect('list', 'events')
        } catch {
          notify('Erreur lors de la création', { type: 'error' })
        } finally {
          setSubmitting(false)
        }
      } 

   return (
    <Box sx={{ backgroundColor: '#181622', minHeight: '100vh', p: 4 }}>
      <Card sx={{ background: '#242233', color: 'white', borderRadius: 4, mb: 3, boxShadow: '0 8px 24px rgba(0,0,0,.25)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={3}>Nouvel événement</Typography>
          <EventFormFields form={form} onChange={handleChange} />
        </CardContent>
      </Card>

      <Card sx={{ background: '#242233', color: 'white', borderRadius: 4, mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} display="flex" alignItems="center" gap={1}>
              <VideocamIcon />
              Sessions
              {sessions.length > 0 && (
                <Chip label={sessions.length} size="small" sx={{ bgcolor: '#5B3FD6', color: 'white', fontWeight: 700 }} />
              )}
            </Typography>
            <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setDialogOpen(true)}
              sx={{ borderRadius: '10px', borderColor: '#5B3FD6', color: '#a78bfa', '&:hover': { background: '#2a2550', borderColor: '#7c3aed' } }}>
              Ajouter une session
            </Button>
          </Box>

          <Divider sx={{ bgcolor: '#3D3A52', mb: 2 }} />

          {sessions.length === 0 ? (
            <Typography sx={{ color: '#8b8fa8'}}>
              Aucune session ajoutée. Vous pourrez en ajouter après la création.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {sessions.map((s, i) => {
                const room = rooms.find((r: any) => r.id === s.id_room) as any
                return (
                  <SessionDraftCard key={i} session={s} roomName={room?.name} onRemove={() => handleRemoveSession(i)} />
                )
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} variant="contained" disabled={!isValid || submitting}
        sx={{ background: '#7c3aed', borderRadius: '12px', px: 4, py: 1.5, fontSize: '0.8rem', '&:hover': { background: '#6d28d9' }, '&:disabled': { background: '#3D3A52', color: '#8b8fa8' } }}>
        {submitting ? 'Création en cours...' : "Créer l'événement"}
      </Button>

      <SessionDialog 
        open={dialogOpen} 
        mode="create" 
        onClose={() => setDialogOpen(false)} 
        onSubmit={handleAddSession} 
        eventStart={form.start_date}
        eventEnd={form.end_date}  
      />
    </Box>
  )
}

export const EventCreate = () => (
  <Create redirect="list">
    <EventCreateForm />
  </Create>
);