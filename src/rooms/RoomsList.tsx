import { List, CreateButton, useListContext, Pagination } from 'react-admin';
import { Box, Grid, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { RoomCard } from './RoomCard';

const RoomsGridView = () => {
    const { data, isLoading, error } = useListContext();
    const navigate = useNavigate();
    const theme = useTheme();

    const isDark = theme.palette.mode === 'dark';
    const bgColor = isDark ? '#0f1729' : '#e0f7fa';
    const textColor = isDark ? '#e6eef6' : '#0f172a';
    const emptyTextColor = isDark ? '#9aa6b2' : '#475569';

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{ color: theme.palette.primary.main }} /></Box>;
    if (error) return <Box sx={{ color: theme.palette.error.main, p: 2 }}>Erreur lors du chargement</Box>;

    return (
        <Box sx={{ width: '100%', bgcolor: bgColor, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2 }}>
                <h1 style={{ margin: 0, color: textColor, fontSize: 32, fontWeight: 700 }}>Salles</h1>
                <CreateButton 
                    variant="contained"
                    sx={{ 
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        '&:hover': { bgcolor: theme.palette.primary.dark },
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 500,
                        py: 1,
                        px: 3,
                        borderRadius: '8px'
                    }}
                />
            </Box>
            
            <Grid container spacing={3} sx={{ width: '100%' }}>
                {data && data.length > 0 ? (
                    data.map((room) => (
                        <Grid key={room.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box 
                                onClick={() => navigate(`/rooms/${room.id}`)}
                                sx={{ cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-4px)' } }}
                            >
                                <RoomCard record={room} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ color: emptyTextColor, p: 4, width: '100%' }}>Aucune salle trouvée</Box>
                )}
            </Grid>
        </Box>
    );
};

export const RoomsList = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const bgColor = isDark ? '#0f1729' : '#e0f7fa';

    return (
        <List 
            sx={{ 
                bgcolor: bgColor,
                '& .RaList-root': { bgcolor: bgColor },
                '& .RaList-main': { bgcolor: bgColor },
                '& .RaList-content': { bgcolor: bgColor }
            }}
            pagination={<Pagination />}
            perPage={12}
        >
            <RoomsGridView />
        </List>
    );
};
