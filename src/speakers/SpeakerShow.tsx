import { Show, SimpleShowLayout, TextField, ImageField, UrlField, EditButton } from 'react-admin'
import { Box, Avatar } from '@mui/material'

export const SpeakerShow = () => (
  <Show
    title="Détails de l'intervenant"
    actions={
      <Box sx={{ p: 1 }}>
        <EditButton label="Modifier" />
      </Box>
    }
  >
    <SimpleShowLayout>

     
      <ImageField
        source="profile_pic"
        label="Photo de profil"
        sx={{
          '& img': {
            width:        '100px !important',
            height:       '100px !important',
            borderRadius: '50%',
            objectFit:    'cover',
            border:       '3px solid #7C3AED'
          }
        }}
      />

      
      <TextField
        source="full_name"
        label="Nom complet"
        sx={{ fontSize: '20px', fontWeight: 'bold' }}
      />

     
      <TextField
        source="biography"
        label="Biographie"
      />

      
      <UrlField
        source="external_links"
        label="Liens externes"
        target="_blank"
      />

    </SimpleShowLayout>
  </Show>
)