import { Create, SimpleForm, TextInput, required } from 'react-admin'


export const SpeakerCreate = () => (
  <Create>
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
        helperText="Exemple : https://picsum.photos/200"
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
        label="Liens externes (site web, réseaux sociaux...)"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Create>
)