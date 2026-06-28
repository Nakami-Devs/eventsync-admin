import {
    List,
    useGetList,
    useDelete,
    TopToolbar,
    CreateButton
} from "react-admin";
import { useNavigate } from "react-router-dom";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box
} from "@mui/material";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteIcon from "@mui/icons-material/Delete";

const TopToolbarActions = () => (
    <TopToolbar sx={{ display: "flex", alignItems: "center", width: "100%", p: 2 }}>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: 2
            }}
        >
            <Typography variant="h4" fontWeight={700}>
                Salles
            </Typography>
            <CreateButton
                sx={{
                    backgroundColor: '#7C3AED',
                    color: '#ffffff',
                    '&:hover': { backgroundColor: '#9152ff' },
                    p: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                }}
                href="/rooms/create"
                label="Nouvelle salle"
            />
        </Box>
    </TopToolbar>
)

export const RoomsList = () => {
    const { data, isLoading } = useGetList("rooms");
    const [deleteOne] = useDelete();
    const navigate = useNavigate();

    const handleDelete = (id: number, event: React.MouseEvent) => {
        event.stopPropagation();
        deleteOne("rooms", { id });
    };

    const handleCardClick = (id: number) => {
        navigate(`/rooms/${id}/show`);
    };

    if (isLoading) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <List
            pagination={false}
            actions={<TopToolbarActions />}
        >
            <Box
                sx={{
                    p: 3,
                    minHeight: "100vh",
                }}
            >
                <Grid container spacing={3}>
                    {data?.map((room: any) => (
                        <Grid
                            key={room.id}
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <Card
                                onClick={() => handleCardClick(room.id)}
                                sx={{
                                    borderRadius: 4,
                                    height: 120,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    px: 2,
                                    cursor: "pointer",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        flex: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: "50%",
                                            bgcolor: "#0f2c44",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <MeetingRoomIcon
                                            sx={{
                                                color: "#00d4ff"
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography fontWeight={700}>
                                            {room.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Capacité : {room.capacity}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {room.sessions?.length ?? 0} sessions
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <IconButton
                                    onClick={(e) => handleDelete(room.id, e)}
                                    sx={{
                                        bgcolor: "#ef4444",
                                        color: "#fff",
                                        "&:hover": {
                                            bgcolor: "#dc2626"
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </List>
    );
};