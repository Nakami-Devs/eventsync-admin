import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    required
} from "react-admin";

export const RoomEdit = () => {
    return (
        <Edit>
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
        </Edit>
    );
};