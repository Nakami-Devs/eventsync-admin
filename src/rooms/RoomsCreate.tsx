import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
} from 'react-admin';

export const RoomsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Nom" required />
            <NumberInput source="capacity" label="Capacité" required />
        </SimpleForm>
    </Create>
);
