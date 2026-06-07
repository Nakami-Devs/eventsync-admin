import { Card, CardContent, Typography, Box, IconButton, SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';
import { useDelete } from 'react-admin';
import { useTheme } from '@mui/material/styles';

const MeetingRoomIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-6-2h2V9h-2v8zm-4 0h2V9H9v8z" />
  </SvgIcon>
);

const DeleteIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-11h2v10H9V8zm4 0h2v10h-2V8zm3-3h-2.5l-1-1h-3l-1 1H6v2h12V5z" />
  </SvgIcon>
);

export const RoomCard = ({ record }: { record: any }) => {
    const [deleteOne, { isLoading }] = useDelete();
    const theme = useTheme();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!record) return;
        try {
            await deleteOne('rooms', { id: record.id, previousData: record });
        } catch (e) {
            console.error('Erreur suppression:', e);
        }
    };

    const sessionCount = record?.capacity || 0;
    const sessionText = sessionCount === 1 ? 'session' : 'sessions';
    
    const isDark = theme.palette.mode === 'dark';
    const bgColor = isDark ? 'rgba(26, 39, 68, 0.6)' : 'rgba(224, 247, 250, 0.6)';
    const textColor = isDark ? '#e6eef6' : '#0f172a';
    const secondaryTextColor = isDark ? '#9aa6b2' : '#475569';
    const iconBg = isDark ? 'linear-gradient(180deg, rgba(6,182,212,0.12), rgba(6,182,212,0.06))' : 'linear-gradient(180deg, rgba(2, 132, 199, 0.12), rgba(2, 132, 199, 0.06))';
    const borderColor = isDark ? 'rgba(148,163,184,0.06)' : 'rgba(2, 132, 199, 0.1)';
    const deleteHoverBg = isDark ? '#dc2626' : '#991b1b';

    return (
        <Card sx={{ 
            borderRadius: 2, 
            bgcolor: bgColor, 
            boxShadow: isDark ? '0 10px 30px rgba(2,6,23,0.5)' : '0 10px 30px rgba(2, 132, 199, 0.1)', 
            border: `1px solid ${borderColor}`, 
            display: 'flex', 
            alignItems: 'center', 
            minHeight: 80,
            p: 2,
            transition: 'all 0.2s ease',
            '&:hover': {
                boxShadow: isDark ? '0 15px 40px rgba(6,182,212,0.15)' : '0 15px 40px rgba(2, 132, 199, 0.2)',
                borderColor: isDark ? 'rgba(6,182,212,0.2)' : 'rgba(2, 132, 199, 0.3)'
            }
        }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2, p: 0 }}>
                <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg, borderRadius: 1.5, flexShrink: 0 }}>
                    <MeetingRoomIcon sx={{ color: '#06b6d4', fontSize: 28 }} />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: textColor, fontWeight: 600, fontSize: 16 }}>
                        {record?.name || 'Salle'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: secondaryTextColor, mt: 0.5, fontSize: 13 }}>
                        {sessionCount} {sessionText}
                    </Typography>
                </Box>

                <Box>
                    <IconButton 
                        onClick={handleDelete} 
                        disabled={isLoading} 
                        sx={{ 
                            bgcolor: '#ef4444', 
                            color: '#fff', 
                            width: 40, 
                            height: 40,
                            flexShrink: 0,
                            '&:hover': { bgcolor: deleteHoverBg },
                            '&.Mui-disabled': { bgcolor: '#ef4444', opacity: 0.6 },
                            boxShadow: '0 6px 18px rgba(239,68,68,0.18)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
