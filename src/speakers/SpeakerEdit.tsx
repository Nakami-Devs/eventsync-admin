import { Edit, SimpleForm, TextInput, required } from 'react-admin'

// Formulaire pour modifier un intervenant existant
export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="full_name"
        label="Nom complet"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="profile_pic"
        label="URL de la photo de profil"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="biography"
        label="Biographie"
        validate={required()}
        multiline
        rows={4}
        fullWidth
      />
      <TextInput
        source="external_links"
        label="Liens externes"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Edit>
)