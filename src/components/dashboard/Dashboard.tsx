import {Container, Stack, Grid, Typography, Paper} from '@mui/material';
import {useGetList} from "react-admin";
import {StatCard} from "../StatCard.tsx";
import {useNavigate} from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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

    const {data: allSessions, isPending: p4} = useGetList(
        "sessions",
        {
            pagination: 
            {page: 1, perPage: 1000}
        }
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

    const sessionsByEventData = events?.map((event: any) => ({
        name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
        sessions: event.sessions?.length || 0,
        fullTitle: event.title,
    })) || []

     const totalSessions = allSessions?.length || 0
    const liveSessions = allSessions?.filter((s: any) => {
        const start = new Date(s.start_time)
        const end = new Date(s.end_time)
        return start <= now && now <= end
    }).length || 0
    const pastSessions = totalSessions - liveSessions

    const sessionStatusData = [
        { name: 'Sessions en cours', value: liveSessions, color: '#7C3AED' },
        { name: 'Sessions terminées', value: pastSessions, color: '#A78BFA' },
    ]

    const sessionsByRoom = allSessions?.reduce((acc: any, session: any) => {
        const roomName = session.room?.name || 'Sans salle'
        acc[roomName] = (acc[roomName] || 0) + 1
        return acc
    }, {}) || {}

    const sessionsByRoomData = Object.entries(sessionsByRoom).map(([name, value]) => ({
        name,
        sessions: value,
    }))

    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate("/events");
    }

    const handleSpeakerClick = () => {
        navigate("/speakers");
    }

    const handleSessionClick = () => {
        navigate("/sessions");
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={1} mb={4}>
                <Typography variant="h2" color="#7C3AED" fontWeight="bold">
                    EventSync, vivez votre événement autrement
                </Typography>
                <Typography variant="body1">
                    Naviguez dans le planning, identifiez les sessions en cours et interagissez
                    avec les intervenants en temps réel.
                </Typography>
            </Stack>
            <Grid container spacing={3} mb={4}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} onClick={handleEventClick} sx={{ cursor: 'pointer' }}>
                    <StatCard title="Événements" value={totalEvents} isPending={p1} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} onClick={handleSpeakerClick} sx={{ cursor: 'pointer' }}>
                    <StatCard title="Intervenants" value={totalSpeakers} isPending={p2} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} onClick={handleSessionClick} sx={{ cursor: 'pointer' }}>
                    <StatCard title="Sessions totales" value={totalSessions} isPending={p4} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} onClick={handleSessionClick} sx={{ cursor: 'pointer' }}>
                    <StatCard title="Sessions en cours" value={liveSessionsCount} isPending={p3} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Sessions par événement
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sessionsByEventData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip 
                                    formatter={(value, name, props) => {
                                        const item = props.payload
                                        return [`${value} sessions`, item?.payload?.fullTitle || '']
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="sessions" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}