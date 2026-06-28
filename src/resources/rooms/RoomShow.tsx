import { 
    Show,
    SimpleShowLayout, 
    TextField, 
    NumberField, 
    ArrayField, 
    SingleFieldList, 
    ChipField 
} from "react-admin";
import { 
    Paper, 
    Typography, 
    Divider, 
    Box 
} from "@mui/material";

/*
Create and delete are working as expected. However, clicking on a card 
doesn't navigate anywhere — no show, no edit, no action at all.
 Please fix the card click behavior. Also, please move the files
  into resources/rooms (replace the existing ones) and put index.ts inside types/.

*/
export const RoomShow = () => {
    return (
        <Show>
            <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
                <SimpleShowLayout>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#7c3aed" }}>
                        Détails de la salle
                    </Typography>
                    
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Nom de la salle
                        </Typography>
                        <TextField source="name" />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Capacité
                        </Typography>
                        <NumberField source="capacity" />
                        <Typography variant="body2" color="textSecondary" component="span">
                            {" "}personnes
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Localisation
                        </Typography>
                        <TextField source="location" />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Équipements
                        </Typography>
                        <ArrayField source="equipment">
                            <SingleFieldList>
                                <ChipField source="name" size="small" />
                            </SingleFieldList>
                        </ArrayField>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Description
                        </Typography>
                        <TextField source="description" />
                    </Box>
                </SimpleShowLayout>
            </Paper>
        </Show>
    );
};