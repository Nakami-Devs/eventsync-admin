import { useState } from 'react'
import { useGetList } from 'react-admin'
import type { SelectChangeEvent } from '@mui/material/Select'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Chip, Box,
  Typography,
} from '@mui/material'
import { inputSx } from '../formStyles'

export interface SessionFormData {
  title: string
  description: string
  start_time: string
  end_time: string
  id_room: string
  speaker_ids: string[]
}

interface SessionDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: SessionFormData) => void
  initial?: Partial<SessionFormData>
  mode: 'create' | 'edit'
  eventStart?: string
  eventEnd?: string
}

const empty: SessionFormData = {
  title: '',
  description: '',
  start_time: '',
  end_time: '',
  id_room: '',
  speaker_ids: [],
}

const toLocal = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const SessionDialog = ({ open, onClose, onSubmit, initial, mode, eventStart, eventEnd }: SessionDialogProps) => {
  const { data: rooms = [] } = useGetList('rooms', { pagination: { page: 1, perPage: 100 } })
  const { data: speakers = [] } = useGetList('speakers', { pagination: { page: 1, perPage: 100 } })

  const [form, setForm] = useState<SessionFormData>({ ...empty, ...initial })
  const [error, setError] = useState<string | null>(null)

  const isValid = form.title && form.start_time && form.end_time && form.id_room

  const handleSpeakerChange = (e: SelectChangeEvent<string[]>) => {
    setForm(f => ({ ...f, speaker_ids: e.target.value as string[] }))
  }

  const handleSubmit = () => {
  if (!isValid) return

  const start = new Date(form.start_time)
  const end = new Date(form.end_time)
  const now = new Date()

  if (start < now) {
    setError('Impossible de créer une session dans le passé.')
    return
  }

  if (start >= end) {
    setError('L\'heure de début doit être avant l\'heure de fin.')
    return
  }

  if (eventStart && eventEnd) {
    const evStart = new Date(eventStart)
    const evEnd = new Date(eventEnd)

    if (start < evStart || end > evEnd) {
      setError('Les horaires de la session doivent être compris dans les dates de l\'événement.')
      return
    }
  }

  onSubmit(form)
  setForm(empty)
  setError(null)
  onClose()
}
   const handleClose = () => {
    setForm(empty)
    setError(null)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', background: '#1e1c2e' } }}
    >
      <DialogTitle sx={{ color: 'white', fontWeight: 700 }}>
        {mode === 'create' ? 'Nouvelle session' : 'Modifier la session'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Titre" value={form.title} fullWidth required
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            sx={inputSx}
          />
          <TextField
            label="Description" value={form.description} multiline rows={2} fullWidth
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            sx={inputSx}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Début" type="datetime-local"
              value={toLocal(form.start_time) || form.start_time}
              fullWidth required InputLabelProps={{ shrink: true }}
              onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))}
              sx={inputSx}
            />
            <TextField
              label="Fin" type="datetime-local"
              value={toLocal(form.end_time) || form.end_time}
              fullWidth required InputLabelProps={{ shrink: true }}
              onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))}
              sx={inputSx}
            />
          </Stack>

          <FormControl fullWidth required sx={inputSx}>
            <InputLabel sx={{ color: '#8b8fa8' }}>Salle</InputLabel>
            <Select
              value={form.id_room} label="Salle"
              onChange={e => setForm(f => ({ ...f, id_room: e.target.value }))}
              sx={{ color: 'white' }}
            >
              {rooms.map((r: any) => (
                <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={inputSx}>
            <InputLabel sx={{ color: '#8b8fa8' }}>Intervenants</InputLabel>
            <Select
              multiple value={form.speaker_ids} label="Intervenants"
              onChange={handleSpeakerChange}
              input={<OutlinedInput label="Intervenants" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map(id => {
                    const sp = speakers.find((s: any) => s.id === id) as any
                    return (
                      <Chip key={id} label={sp?.full_name ?? id} size="small"
                        sx={{ bgcolor: '#5B3FD6', color: 'white' }} />
                    )
                  })}
                </Box>
              )}
              sx={{ color: 'white' }}
            >
              {speakers.map((s: any) => (
                <MenuItem key={s.id} value={s.id}>{s.full_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      {error && (
        <Typography color="error" variant="body2" sx={{ px: 3, pb: 1 }}>
          {error}
        </Typography>
      )}

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#8b8fa8', borderRadius: '10px' }}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit} variant="contained" disabled={!isValid}
          sx={{ background: '#7c3aed', borderRadius: '10px', '&:hover': { background: '#6d28d9' } }}
        >
          {mode === 'create' ? 'Créer' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
