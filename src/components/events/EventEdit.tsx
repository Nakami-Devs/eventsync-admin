import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <DateTimeInput source="start_date" />
      <DateTimeInput source="end_date" />
      <TextInput source="place" />
    </SimpleForm>
  </Edit>
);