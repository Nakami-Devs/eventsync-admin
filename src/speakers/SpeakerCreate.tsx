import { Create, SimpleForm, TextInput, required } from 'react-admin'
import { Box } from '@mui/material'

const inputSx = {
  '& .MuiInputBase-root': {
    background:   'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    color:        'white',
  },
  '& .MuiInputLabel-root':            { color: 'rgba(255,255,255,0.6)' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
}

export const SpeakerCreate = () => (
  <Create
    title="Nouvel intervenant"
    sx={{ '& .RaCreate-main': { background: 'transparent' } }}
  >
    <SimpleForm
      sx={{ background: '#1a1b35', borderRadius: '12px', p: 3 }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>

        <TextInput
          source="full_name"
          label="Nom complet"
          validate={required()}
          fullWidth
          sx={inputSx}
        />

        <TextInput
          source="profile_pic"
          label="Photo de profil (URL)"
          validate={required()}
          fullWidth
          placeholder="https://..."
          sx={inputSx}
        />

        <TextInput
          source="biography"
          label="Biographie"
          validate={required()}
          multiline
          rows={4}
          fullWidth
          sx={inputSx}
        />

        <TextInput
          source="external_links"
          label="Liens externes (site web, réseaux sociaux...)"
          validate={required()}
          fullWidth
          placeholder="https://..."
          sx={inputSx}
        />

      </Box>
    </SimpleForm>
  </Create>
)