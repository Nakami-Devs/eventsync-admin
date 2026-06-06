import {Container, Stack, Grid, Typography} from '@mui/material';
import {useGetList} from "react-admin";
import {StatCard} from "../StatCard.tsx";

export const Dashboard = () => {
    const {total: totalEvents, isPending: p1} = useGetList(
        "events",
        {
            pagination:
                {page: 1, perPage: 1}
        }
    )

    const {total: totalSessions, isPending: p3} = useGetList(
        "sessions",
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

    return (
        <Container maxWidth="lg" sx={{mt: 24, mb: 4}}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography variant="h2" color="#7C3AED" fontWeight="bold">EventSync, vivez votre événement autrement</Typography>
                    <Typography variant="body1">Naviguez dans le planning, identifiez les sessions en cours et
                        interagissez
                        avec les intervenants en temps réel.</Typography>
                </Stack>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, sm: 6, md: 4}}>
                        <StatCard title="Événements" value={totalEvents} isPending={p1}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 4}}>
                        <StatCard title="Intervenants" value={totalSpeakers} isPending={p2}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 4}}>
                        <StatCard title="Sessions" value={totalSessions} isPending={p3}/>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}