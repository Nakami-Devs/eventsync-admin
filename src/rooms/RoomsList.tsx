import {
    List,
    useGetList,
    useDelete,
    TopToolbar,
    CreateButton
} from "react-admin";

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

export const RoomsList = () => {
    const { data, isLoading } = useGetList("rooms");

    const [deleteOne] = useDelete();

    const handleDelete = (id: number) => {
        deleteOne("rooms", { id });
    };

    if (isLoading) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <List
            pagination={false}
            actions={
                <TopToolbar>
                    <CreateButton label="Nouvelle salle" />
                </TopToolbar>
            }
        >
            <Box
                sx={{
                    p: 3,
                    minHeight: "100vh"
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={4}
                >
                    Salles
                </Typography>

                <Grid container spacing={3}>
                    {data?.map((room: any) => (
                        <Grid
                            key={room.id}
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    height: 120,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    px: 2
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
                                    onClick={() => handleDelete(room.id)}
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