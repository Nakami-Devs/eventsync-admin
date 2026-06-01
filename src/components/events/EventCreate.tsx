import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput label="Titre" source="title" />
      <TextInput label="Description" source="description" multiline />
      <DateTimeInput label="Date de debut" source="start_date" />
      <DateTimeInput label="Date de fin" source="end_date" />
      <TextInput label="Place" source="place" />
    </SimpleForm>
  </Create>
);