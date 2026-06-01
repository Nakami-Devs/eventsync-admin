import { List, Datagrid, TextField, UrlField, ImageField } from 'react-admin'

// Affiche la liste de tous les intervenants sous forme de tableau
export const SpeakerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="profile_pic"   label="Photo"           sx={{ '& img': { width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' } }} />
      <TextField  source="full_name"     label="Nom complet"     />
      <TextField  source="biography"     label="Biographie"      />
      <UrlField   source="external_links" label="Liens externes" />
    </Datagrid>
  </List>
)