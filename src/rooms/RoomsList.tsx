import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DeleteButton,
    TopToolbar,
    CreateButton,
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const RoomsList = () => (
    <List actions={<ListActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" label="Nom" />
            <NumberField source="capacity" label="Capacité" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
