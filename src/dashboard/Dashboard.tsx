import { Card, CardContent, Typography } from '@mui/material';

export const Dashboard = () => (
    <Card>
        <CardContent>
            <Typography variant="h5" gutterBottom>
                Bienvenue sur EventSync Admin
            </Typography>
            <Typography variant="body2">
                Gérez vos événements, intervenants et salles en tant réel depuis ce plateforme.
            </Typography>
        </CardContent>
    </Card>
);