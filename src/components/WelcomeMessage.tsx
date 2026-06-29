import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Typography, Paper, Stack } from '@mui/material';

export const WelcomeMessage = () => {
    return (
        <Paper 
            elevation={0} 
            sx={{ 
                p: 4, 
                borderRadius: 2,
                maxWidth: '100%'
            }}
        >
            <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2}
                sx={{ mb: 2 }}
            >
                <ChatBubbleIcon 
                    sx={{ 
                        color: 'primary.main',
                        fontSize: 40
                    }} 
                />
                <Typography 
                    variant="h5" 
                    component="h1"
                    sx={{ 
                        fontWeight: 600,
                        fontSize: '1.25rem'
                    }}
                >
                    Bienvenue dans EventSync Admin
                </Typography>
            </Stack>
            
            <Typography 
                variant="body1"
                sx={{ 
                    color: 'text.secondary',
                    fontSize: '1rem',
                    lineHeight: 1.7
                }}
            >
                Utilisez le menu de gauche pour gérer vos événements, sessions, intervenants et salle.
                Toutes les modifications seront immédiatement visibles sur la partie publique du site.
            </Typography>
        </Paper>
    );
};