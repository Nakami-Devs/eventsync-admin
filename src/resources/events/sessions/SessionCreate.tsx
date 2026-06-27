import { Create, SimpleForm, TextInput, DateTimeInput, ReferenceInput, SelectInput, required } from 'react-admin';
import { useParams } from 'react-router-dom';

export const SessionCreate = () => {
  const { id: eventId } = useParams();

  return (
    <Create resource="sessions">
      <SimpleForm>
        <TextInput source="title" validate={required()} />
        <TextInput source="description" multiline validate={required()} />
        <DateTimeInput source="start_time" validate={required()} />
        <DateTimeInput source="end_time" validate={required()} />
        
        <ReferenceInput source="id_room" reference="rooms">
          <SelectInput optionText="name" validate={required()}/>
        </ReferenceInput>
        
        <ReferenceInput source="speaker_ids" reference="speakers">
          <SelectInput optionText="full_name" multiline />
        </ReferenceInput>
        
        <TextInput source="id_event" defaultValue={eventId} hidden />
      </SimpleForm>
    </Create>
  );
};