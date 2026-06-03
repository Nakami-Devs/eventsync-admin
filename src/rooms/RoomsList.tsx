import { Box, Typography, Button } from '@mui/material';
import { useGetList } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { RoomCard } from './RoomCard.tsx';

const Header = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4" sx={{ color: '#eef2ff' }}>Salles</Typography>
            <Button onClick={() => navigate('/rooms/create')} variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'linear-gradient(90deg,#8b5cf6,#7c3aed)', color: '#fff', '&:hover': { opacity: 0.95 }, borderRadius: 999, px: 2.5, py: 1 }}>
                Nouvelle salle
            </Button>
        </Box>
    );
};

export const RoomsList = () => {
    const { data } = useGetList('rooms', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' } });

    const records = data || [];

    return (
        <Box>
            <Header />

            <Box sx={{ display: 'grid', gap: '16px', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                {records.map((r: any) => (
                    <Box key={r.id}>
                        <RoomCard record={r} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
