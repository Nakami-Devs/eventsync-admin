import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    required
} from "react-admin";

export const RoomCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="name"
                    label="Nom de la salle"
                    validate={[required()]}
                    fullWidth
                />

                <NumberInput
                    source="capacity"
                    label="Capacité"
                    validate={[required()]}
                />
            </SimpleForm>
        </Create>
    );
};