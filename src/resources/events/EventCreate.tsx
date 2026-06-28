import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
} from "react-admin";

export const EventCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput label="Titre" source="title" validate={required()} />
      <TextInput label="Description" source="description" multiline validate={required()}/>
      <DateTimeInput label="Date de debut" source="start_date" validate={required()}/>
      <DateTimeInput label="Date de fin" source="end_date" validate={required()}/>
      <TextInput label="Place" source="place" validate={required()}/>
    </SimpleForm>
  </Create>
);