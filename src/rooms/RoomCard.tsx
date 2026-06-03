import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useDelete } from 'react-admin';

export const RoomCard = ({ record }: { record: any }) => {
    const [deleteOne, { isLoading }] = useDelete();

    const handleDelete = async () => {
        if (!record) return;
        try {
            await deleteOne('rooms', { id: record.id, previousData: record });
        } catch (e) {

        }
    };

    return (
        <Card sx={{ borderRadius: 12, bgcolor: 'rgba(17,24,39,0.6)', boxShadow: '0 10px 30px rgba(2,6,23,0.5)', border: '1px solid rgba(148,163,184,0.06)', display: 'flex', alignItems: 'center', minHeight: 72 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1, p: 1 }}>
                <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(6,182,212,0.12), rgba(6,182,212,0.06))', borderRadius: 2 }}>
                    <MeetingRoomIcon sx={{ color: '#06b6d4' }} />
                </Box>

                <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography variant="h6" sx={{ color: '#e6eef6', fontWeight: 600 }}>{record?.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#9aa6b2', mt: 0.5 }}>{record?.sessions ?? 0} sessions</Typography>
                </Box>

                <Box>
                    <IconButton onClick={handleDelete} disabled={isLoading} sx={{ bgcolor: '#ef4444', color: '#fff', '&:hover': { bgcolor: '#dc2626' }, width: 40, height: 40, boxShadow: '0 6px 18px rgba(239,68,68,0.18)' }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
