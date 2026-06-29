import {
  Show,
  TopToolbar,
  EditButton,
  ListButton,
  useRecordContext,
} from "react-admin";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import { SessionsBlock } from "./sessions/SessionsBlock";

const EventShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const EventContent = () => {
  const record = useRecordContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!record) return null;


  const bgPage = isDark ? "#0f172a" : "#F4F4F8"
  const bgCard = isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF"
  const bgChip = isDark ? "rgba(255,255,255,0.10)" : "#E8E6F0"
  const textColor = isDark ? "#FAFAFA" : theme.palette.text.primary
  const subText = isDark ? "#94a3b8" : theme.palette.text.secondary
  const divider = isDark ? "rgba(255,255,255,0.10)" : "#E0DFF0"

  return (
    <Box sx={{
      background: isDark
        ? "linear-gradient(to bottom right, #0f172a, #1e1b4b, #020617)"
        : "#F4F4F8",
      minHeight: "100vh",
      p: 4,
    }}>
      <Card sx={{ background: bgCard, color: textColor, borderRadius: 4, mb: 4, boxShadow: "0 8px 24px rgba(0,0,0,.1)" }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom color={textColor}>
            {record.title}
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" mt={2}>
            <Chip
              icon={<CalendarMonthIcon />}
              label={new Date(record.start_date).toLocaleString()}
              sx={{ bgcolor: bgChip, color: textColor }}
            />
            <Chip
              icon={<EventIcon />}
              label={new Date(record.end_date).toLocaleString()}
              sx={{ bgcolor: bgChip, color: textColor }}
            />
            <Chip
              icon={<LocationOnIcon />}
              label={record.place}
              sx={{ bgcolor: "#5B3FD6", color: "white", fontWeight: 600 }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ background: bgCard, color: textColor, borderRadius: 4, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2} display="flex" alignItems="center" gap={1} color={textColor}>
            <DescriptionIcon />
            Description
          </Typography>

          <Divider sx={{ bgcolor: divider, mb: 3 }} />

          <Typography sx={{ color: subText, lineHeight: 1.9 }}>
            {record.description || "Aucune description disponible."}
          </Typography>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {[
          { label: "Début", value: new Date(record.start_date).toLocaleDateString() },
          { label: "Fin", value: new Date(record.end_date).toLocaleDateString() },
          { label: "Lieu", value: record.place },
        ].map(({ label, value }) => (
          <Card key={label} sx={{ flex: 1, bgcolor: bgCard, color: textColor, borderRadius: 4 }}>
            <CardContent>
              <Typography color={subText}>{label}</Typography>
              <Typography variant="h6" mt={1} color={textColor}>{value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <SessionsBlock />
    </Box>
  );
};

export const EventShow = () => (
  <Show actions={<EventShowActions />}>
    <EventContent />
  </Show>
);