import { Edit, SimpleForm, TextInput, DateTimeInput, ReferenceInput, SelectInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { useParams } from 'react-router-dom';

export const SessionEdit = () => {
    const { id: eventId } = useParams();

    return (
        <Edit resource="sessions" redirect="list">
            <SimpleForm>
                <TextInput source="title" validate={required()} />
                <TextInput source="description" multiline validate={required()} />
                <DateTimeInput source="start_time" validate={required()} />
                <DateTimeInput source="end_time" validate={required()} />
                
                <ReferenceInput source="id_room" reference="rooms" >
                    <SelectInput optionText="name" validate={required()} />
                </ReferenceInput>
                
                <ReferenceArrayInput source="speaker_ids" reference="speakers">
                    <SelectArrayInput optionText="full_name" />
                </ReferenceArrayInput>
                
                <TextInput source="id_event" defaultValue={eventId} hidden />
            </SimpleForm>
        </Edit>
    );
};