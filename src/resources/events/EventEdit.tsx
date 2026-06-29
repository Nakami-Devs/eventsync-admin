import { useState } from "react";
import {
  Edit,
  useCreate,
  useUpdate,
  useNotify,
  useDelete,
  useGetList,
  useRefresh,
  useGetManyReference,
  Button,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { SessionDialog, type SessionFormData } from "./components/SessionDialog";
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { DeleteDialog } from "./components/DeleteDialog";
import { SessionCard } from "./components/SessionCard";
import AddIcon from '@mui/icons-material/Add'
import VideocamIcon from '@mui/icons-material/Videocam'
import { EventFormFields } from "./components/EventFormFields";

const SessionsSection = ({ eventId }: { eventId: string }) => {
  const [create] = useCreate();
  const [update] = useUpdate();
  const [deleteOne] = useDelete();
  const notify = useNotify();
  const refresh = useRefresh()
  const { data: rooms = [] } = useGetList(
    'rooms',
    {
      pagination:
        { page: 1, perPage: 100 }
    }
  )

  const { data: sessions = [], isLoading } = useGetManyReference(
    'sessions', {
    target: 'id_event', id: eventId,
    pagination: { page: 1, perPage: 50 },
    sort: { field: 'start_time', order: 'ASC' },
  })

  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<any>(null)
  const [deleteTarget, setDeleteTarget] = useState<any>(null)

  const handleCreate = (data: SessionFormData) => {
      create(
        'sessions',
        { data: { ...data, id_event: eventId, start_time: new Date(data.start_time).toISOString(), end_time: new Date(data.end_time).toISOString() } },
        {
          onSuccess: () => { notify('Session créée', { type: 'success' }); setCreateOpen(false); refresh() },
          onError: () => notify('Erreur création', { type: 'error' }),
        }
      )
    } 


   const handleEdit = (data: SessionFormData) => {
      update(
        'sessions',
        { id: editTarget.id, data: { ...data, start_time: new Date(data.start_time).toISOString(), end_time: new Date(data.end_time).toISOString() }, previousData: editTarget },
        {
          onSuccess: () => { notify('Session modifiée', { type: 'success' }); setEditTarget(null); refresh() },
          onError: () => notify('Erreur modification', { type: 'error' }),
        }
      )
    }
  
    const handleDelete = () => {
      deleteOne(
        'sessions',
        { id: deleteTarget.id, previousData: deleteTarget },
        {
          onSuccess: () => { notify('Session supprimée', { type: 'success' }); setDeleteTarget(null); refresh() },
          onError: () => notify('Erreur suppression', { type: 'error' }),
        }
      )
    }

    return (
    <>
      <Card sx={{ background: '#242233', color: 'white', borderRadius: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} display="flex" alignItems="center" gap={1}>
              <VideocamIcon />
              Sessions
              {sessions.length > 0 && (
                <Chip label={sessions.length} size="small" sx={{ bgcolor: '#5B3FD6', color: 'white', fontWeight: 700 }} />
              )}
            </Typography>
            <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setCreateOpen(true)}
              sx={{ borderRadius: '10px', borderColor: '#5B3FD6', color: '#a78bfa', '&:hover': { background: '#2a2550', borderColor: '#7c3aed' } }}>
              Ajouter
            </Button>
          </Box>

          <Divider sx={{ bgcolor: '#3D3A52', mb: 2 }} />

          {isLoading && (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress size={24} sx={{ color: '#7c3aed' }} />
            </Box>
          )}

          {!isLoading && sessions.length === 0 && (
            <Typography sx={{ color: '#8b8fa8'}}>
              Aucune session pour cet événement.
            </Typography>
          )}

          {!isLoading && sessions.length > 0 && (
            <Stack spacing={1.5}>
              {sessions.map((session: any) => {
                const room = rooms.find((r: any) => r.id === session.id_room) as any
                return (
                  <SessionCard
                    key={session.id}
                    session={session}
                    roomName={room?.name}
                    onEdit={() => setEditTarget(session)}
                    onDelete={() => setDeleteTarget(session)}
                  />
                )
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

      <SessionDialog open={createOpen} mode="create" onClose={() => setCreateOpen(false)} onSubmit={handleCreate} />

      {editTarget && (
        <SessionDialog
          open={!!editTarget} mode="edit"
          onClose={() => setEditTarget(null)}
          onSubmit={handleEdit}
          initial={{
            title: editTarget.title,
            description: editTarget.description,
            start_time: editTarget.start_time,
            end_time: editTarget.end_time,
            id_room: editTarget.id_room,
            speaker_ids: editTarget.speaker_ids ?? [],
          }}
        />
      )}

      {deleteTarget && (
        <DeleteDialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title={deleteTarget.title}
        />
      )}
    </>
  )
}

const EventEditForm = () => {
  const record = useRecordContext()
  const [update] = useUpdate()
  const notify = useNotify()
  const redirect = useRedirect()

  const [form, setForm] = useState({
    title: record?.title ?? '',
    description: record?.description ?? '',
    start_date: record?.start_date ?? '',
    end_date: record?.end_date ?? '',
    place: record?.place ?? '',
  })

  if (!record) return null

  const handleChange = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = () => {
    update(
      'events',
      { id: record.id, data: form, previousData: record },
      {
        onSuccess: () => { notify('Événement modifié', { type: 'success' }); redirect('list', 'events') },
        onError: () => notify('Erreur lors de la modification', { type: 'error' }),
      }
    )
  }

  return (
    <Box sx={{ backgroundColor: '#181622', minHeight: '100vh', p: 4 }}>
      <Card sx={{ background: '#242233', color: 'white', borderRadius: 4, mb: 3, boxShadow: '0 8px 24px rgba(0,0,0,.25)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={3}>Modifier l'événement</Typography>
          <EventFormFields form={form} onChange={handleChange} />
        </CardContent>
      </Card>

      <Box mb={3}>
        <SessionsSection eventId={String(record.id)} />
      </Box>

      <Button onClick={handleSubmit} variant="contained"
        sx={{ background: '#7c3aed', borderRadius: '12px', px: 4, py: 1.5, fontSize: '1rem', fontWeight: 700, '&:hover': { background: '#6d28d9' } }}>
        Enregistrer les modifications
      </Button>
    </Box>
  )
}

export const EventEdit = () => (
  <Edit>
    <EventEditForm />
  </Edit>
);