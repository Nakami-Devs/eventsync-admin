import { 
    Show,
    SimpleShowLayout, 
    TextField, 
    NumberField, 
    FunctionField
} from "react-admin";
import { 
    Paper, 
    Typography, 
    Divider, 
    Box, 
    Chip
} from "@mui/material";

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
                     <FunctionField
                    label="Sessions planifiées"
                    render={(record: any) => {
                        const sessions = record?.sessions;

                        if (!sessions || sessions.length === 0) {
                            return (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Aucune session planifiée dans cette salle.
                                </Typography>
                            );
                        }

                        return (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                {sessions.map((session: any, index: number) => (
                                    <Chip 
                                        key={session.id || index} 
                                        label={session.title || `Session #${session.id || index + 1}`} 
                                        variant="outlined"
                                        color="primary"
                                    />
                                ))}
                            </Box>
                        );
                    }}
                />
                </SimpleShowLayout>
            </Paper>
        </Show>
    );
};