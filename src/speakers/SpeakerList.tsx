import {
  List, Datagrid, TextField,
  UrlField, ImageField,
  EditButton, DeleteWithConfirmButton
} from 'react-admin'

export const SpeakerList = () => (
  <List>
    <Datagrid>
      <ImageField
        source="profile_pic"
        label="Photo"
        sx={{ '& img': { width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' } }}
      />
      <TextField source="full_name"      label="Nom complet"    />
      <TextField source="biography"      label="Biographie"     />
      <UrlField  source="external_links" label="Liens externes" />

      <EditButton label="Modifier" />

      <DeleteWithConfirmButton
        confirmTitle="Supprimer cet intervenant ?"
        confirmContent="Cette action est irréversible."
        onClick={(e) => e.stopPropagation()}
      />
    </Datagrid>
  </List>
)