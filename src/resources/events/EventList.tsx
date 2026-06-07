import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const EventList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="start_date" showTime />
      <DateField source="end_date" showTime />
      <TextField source="place" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);