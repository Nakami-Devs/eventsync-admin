import { TextField, Stack } from '@mui/material'
import { inputSx } from '../formStyles'

interface EventFormFieldsProps {
  form: {
    title: string
    description: string
    start_date: string
    end_date: string
    place: string
  }
  onChange: (field: string, value: string) => void
}

const toLocal = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const EventFormFields = ({ form, onChange }: EventFormFieldsProps) => (
  <Stack spacing={2.5}>
    <TextField
      label="Titre"
      value={form.title}
      fullWidth
      required
      onChange={e => onChange('title', e.target.value)}
      sx={inputSx}
    />
    <TextField
      label="Description"
      value={form.description}
      multiline
      rows={3}
      fullWidth
      required
      onChange={e => onChange('description', e.target.value)}
      sx={inputSx}
    />
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <TextField
        label="Date de début"
        type="datetime-local"
        value={toLocal(form.start_date)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        onChange={e => onChange('start_date', e.target.value)}
        sx={inputSx}
      />
      <TextField
        label="Date de fin"
        type="datetime-local"
        value={toLocal(form.end_date)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        onChange={e => onChange('end_date', e.target.value)}
        sx={inputSx}
      />
    </Stack>
    <TextField
      label="Lieu"
      value={form.place}
      fullWidth
      required
      onChange={e => onChange('place', e.target.value)}
      sx={inputSx}
    />
  </Stack>
)
