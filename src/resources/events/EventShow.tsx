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
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";

const EventShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const EventContent = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#181622",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Card
        sx={{
          background: "#242233",
          color: "white",
          borderRadius: 4,
          mb: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            {record.title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            mt={2}
          >
            <Chip
              icon={<CalendarMonthIcon />}
              label={new Date(record.start_date).toLocaleString()}
              sx={{
                bgcolor: "#34304B",
                color: "white",
              }}
            />

            <Chip
              icon={<EventIcon />}
              label={new Date(record.end_date).toLocaleString()}
              sx={{
                bgcolor: "#34304B",
                color: "white",
              }}
            />

            <Chip
              icon={<LocationOnIcon />}
              label={record.place}
              sx={{
                bgcolor: "#5B3FD6",
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card
        sx={{
          background: "#242233",
          color: "white",
          borderRadius: 4,
          mb: 4,
        }}
      >
        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <DescriptionIcon />
            Description
          </Typography>

          <Divider
            sx={{
              bgcolor: "#3D3A52",
              mb: 3,
            }}
          />

          <Typography
            sx={{
              color: "#C8C8D3",
              lineHeight: 1.9,
            }}
          >
            {record.description || "Aucune description disponible."}
          </Typography>

        </CardContent>
      </Card>
      
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
      >
        <Card
          sx={{
            flex: 1,
            bgcolor: "#242233",
            color: "white",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography color="gray">
              Début
            </Typography>

            <Typography
              variant="h6"
              mt={1}
            >
              {new Date(record.start_date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            bgcolor: "#242233",
            color: "white",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography color="gray">
              Fin
            </Typography>

            <Typography
              variant="h6"
              mt={1}
            >
              {new Date(record.end_date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: 1,
            bgcolor: "#242233",
            color: "white",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography color="gray">
              Lieu
            </Typography>

            <Typography
              variant="h6"
              mt={1}
            >
              {record.place}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export const EventShow = () => (
  <Show actions={<EventShowActions />}>
    <EventContent />
  </Show>
);