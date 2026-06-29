import { Container, Stack, Grid, Typography, Paper, Box } from '@mui/material';
import { useGetList } from "react-admin";
import { StatCard } from "../StatCard.tsx";
import { useNavigate } from "react-router-dom";
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
    Cell,
    Pie,
} from 'recharts';

export const Dashboard = () => {

    const { data: events, isPending: p1 } = useGetList(
        "events",
        { pagination: { page: 1, perPage: 1000 } }
    )

    const { total: totalSpeakers, isPending: p2 } = useGetList(
        "speakers",
        {
            pagination:
                { page: 1, perPage: 1 }
        }
    )

    const { data: allSessions, isPending: p3 } = useGetList(
        "sessions",
        {
            pagination:
                { page: 1, perPage: 1000 }
        }
    )
    const now = new Date()
    const totalEvents = events?.length || 0
    const totalSessions = allSessions?.length || 0

    const liveSessions = allSessions?.filter((s: any) => {
        const start = new Date(s.start_time)
        const end = new Date(s.end_time)
        return start <= now && now <= end
    }).length || 0

    const pastSessions = totalSessions - liveSessions

    const sessionsByEventData = events?.map((event: any) => {
        const sessionCount = allSessions?.filter(
            (s: any) => s.id_event === event.id
        ).length || 0

        return {
            name: event.title?.length > 15 ? event.title.substring(0, 15) + '...' : event.title || 'Sans titre',
            sessions: sessionCount,
            fullTitle: event.title || 'Sans titre',
        }
    }) || []

    const hasSessionData = sessionsByEventData.some(d => d.sessions > 0)

    const maxSessions = Math.max(...sessionsByEventData.map(d => d.sessions), 0)
    const yAxisMax = Math.max(maxSessions + 1, 5)

     const sessionStatusData = [
    { name: 'Sessions en cours', value: liveSessions, color: '#7C3AED' },
    { name: 'Sessions terminées', value: pastSessions, color: '#A78BFA' },
  ].filter(item => item.value > 0) 

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
                    <StatCard title="Sessions totales" value={totalSessions} isPending={p3} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} onClick={handleSessionClick} sx={{ cursor: 'pointer' }}>
                    <StatCard title="Sessions en cours" value={liveSessions} isPending={p3} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Sessions par événement
                        </Typography>
                        {!hasSessionData ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                                <Typography sx={{ color: '#8b8fa8' }}>
                                    Aucune session pour le moment
                                </Typography>
                            </Box>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={sessionsByEventData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        allowDecimals={false}
                                        domain={[0, yAxisMax]}
                                        tickCount={yAxisMax + 1}
                                    />
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            const item = props?.payload
                                            return [`${value} session${value > 1 ? 's' : ''}`, item?.fullTitle || '']
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="sessions" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                        Status des sessions
                        </Typography>
                        {sessionStatusData.length === 0 ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                                <Typography sx={{ color: '#8b8fa8' }}>
                                Aucune session pour le moment
                                </Typography>
                            </Box>
                            ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={sessionStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sessionStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value} session${value > 1 ? 's' : ''}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                            )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}