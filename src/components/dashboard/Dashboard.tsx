import {Container, Stack, Grid, Typography} from '@mui/material';
import {useGetList} from "react-admin";
import {StatCard} from "../StatCard.tsx";
import {useNavigate} from "react-router-dom";

export const Dashboard = () => {
    const {total: totalEvents, isPending: p1} = useGetList(
        "events",
        {
            pagination:
                {page: 1, perPage: 1}
        }
    )

    const {total: totalSpeakers, isPending: p2} = useGetList(
        "speakers",
        {
            pagination:
                {page: 1, perPage: 1}
        }
    )

    const {data: events, isPending: p3} = useGetList(
        "events",
        {pagination: {page: 1, perPage: 1000}}
    )

    const now = new Date()
    const liveSessionsCount = events?.reduce((acc, event: any) => {
        const sessions = event.sessions || []
        const live = sessions.filter((session: any) => {
            const start = new Date(session.start_time)
            const end = new Date(session.end_time)
            return start <= now && now <= end
        }).length
        return acc + live
    }, 0) || 0

    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate("/events");
    }

    const handleSpeakerClick = () => {
        navigate("/speakers");
    }

    const handleSessionClick = () => {
        navigate("/sessions/live");
    }

    return (
        <Container maxWidth="lg" sx={{mt: 24, mb: 4}}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography variant="h2" color="#7C3AED" fontWeight="bold">EventSync, vivez votre événement
                        autrement</Typography>
                    <Typography variant="body1">Naviguez dans le planning, identifiez les sessions en cours et
                        interagissez
                        avec les intervenants en temps réel.</Typography>
                </Stack>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, sm: 6, md: 4}} onClick={handleEventClick}>
                        <StatCard title="Événements" value={totalEvents} isPending={p1}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 4}} onClick={handleSpeakerClick}>
                        <StatCard title="Intervenants" value={totalSpeakers} isPending={p2}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 4}} onClick={handleSessionClick}>
                        <StatCard title="Sessions en cours" value={liveSessionsCount} isPending={p3}/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}