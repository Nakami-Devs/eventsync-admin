import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
} from 'react-admin';

export const RoomsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Nom" required />
            <NumberInput source="capacity" label="Capacité" required />
        </SimpleForm>
    </Edit>
);
