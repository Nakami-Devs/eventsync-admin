import { TextInput, SimpleForm, Create, Edit, required } from 'react-admin';
import { Box } from '@mui/material';

export const RoomCreate = () => (
    <Create>
        <SimpleForm>
            <Box sx={{ p: 2 }}>
                <TextInput source="name" label="Nom de la salle" validate={required()} fullWidth />
                <TextInput source="capacity" label="Capacité" type="number" validate={required()} fullWidth />
                <TextInput source="description" label="Description" fullWidth multiline rows={4} />
            </Box>
        </SimpleForm>
    </Create>
);

export const RoomEdit = () => (
    <Edit>
        <SimpleForm>
            <Box sx={{ p: 2 }}>
                <TextInput source="name" label="Nom de la salle" validate={required()} fullWidth />
                <TextInput source="capacity" label="Capacité" type="number" validate={required()} fullWidth />
                <TextInput source="description" label="Description" fullWidth multiline rows={4} />
            </Box>
        </SimpleForm>
    </Edit>
);
