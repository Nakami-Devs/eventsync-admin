import {
  List,
  useListContext,
  useDelete,
  useNotify,
  useRedirect,
} from "react-admin";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EventRowList = () => {
  const { data, isLoading } = useListContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const redirect = useRedirect();
  const notify = useNotify();
  const [deleteOne] = useDelete();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);

  const handleDeleteClick = (event: any) => {
    setEventToDelete(event);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteOne(
      "events",
      { id: eventToDelete.id, previousData: eventToDelete },
      {
        onSuccess: () => {
          notify("Événement supprimé avec succès", { type: "success" });
          setConfirmOpen(false);
          setEventToDelete(null);
        },
        onError: () => {
          notify("Erreur lors de la suppression", { type: "error" });
          setConfirmOpen(false);
        },
      }
    );
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setEventToDelete(null);
  };

  if (isLoading) return <Typography>Chargement...</Typography>;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {data?.map((event, index) => (
          <Box
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              redirect(`/events/${event.id}/show`)
            }
            }
            sx={{
              background: isDark ? "#1e2235" : "#ffffff",
              borderRadius: "16px",
              px: 4,
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.2s",
              "&:hover": {
                background: isDark ? "#252b42" : "#faf8ff",
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  mb: 0.5,
                  fontSize: "1.05rem",
                  color: isDark ? "#ffffff" : "#111827",
                }}
              >
                {event.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarMonthIcon
                    sx={{
                      fontSize: "0.9rem",
                      color: isDark ? "#8b8fa8" : "#6b7280",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? "#8b8fa8" : "#6b7280" }}
                  >
                    {event.start_date
                      ? new Date(event.start_date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      : "—"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOnIcon
                    sx={{
                      fontSize: "0.9rem",
                      color: isDark ? "#8b8fa8" : "#6b7280",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? "#8b8fa8" : "#6b7280" }}
                  >
                    {event.place || "—"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  redirect(`/sessions?filter=${encodeURIComponent(JSON.stringify({ id_event: event.id }))}`)
                }
                }
                sx={{
                  display: "flex", alignItems: "center", gap: 0.5,
                  px: 2, py: 0.8, borderRadius: "10px",
                  border: `1.5px solid ${isDark ? "#3d3560" : "#e5e0f8"}`,
                  cursor: "pointer",
                  "&:hover": { background: isDark ? "#2a2550" : "#f3f0ff" },
                }}
              >
                <VideocamIcon sx={{ fontSize: "1rem", color: "#7c3aed" }} />
                <Typography variant="body2" fontWeight={600} sx={{ color: "#7c3aed" }}>
                  Sessions
                </Typography>
              </Box>

              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  redirect(`/events/${event.id}/edit`)
                }
                }
                sx={{
                  display: "flex", alignItems: "center", gap: 0.5,
                  px: 2, py: 0.8, borderRadius: "10px",
                  border: `1.5px solid ${isDark ? "#3d3560" : "#e5e0f8"}`,
                  cursor: "pointer",
                  "&:hover": { background: isDark ? "#2a2550" : "#f3f0ff" },
                }}
              >
                <EditIcon sx={{ fontSize: "1rem", color: "#7c3aed" }} />
                <Typography variant="body2" fontWeight={600} sx={{ color: "#7c3aed" }}>
                  Modifier
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteClick(event)
                }
                }
                sx={{
                  color: "#ef4444",
                  border: `1.5px solid ${isDark ? "#3d2020" : "#fecaca"}`,
                  borderRadius: "10px",
                  px: 1,
                  "&:hover": { background: isDark ? "#2d1515" : "#fff1f1" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: isDark ? "#1e2235" : "#ffffff",
            px: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: isDark ? "#ffffff" : "#111827",
          }}
        >
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: isDark ? "#8b8fa8" : "#6b7280" }}
          >
            Voulez-vous vraiment supprimer{" "}
            <strong style={{ color: isDark ? "#ffffff" : "#111827" }}>
              {eventToDelete?.title}
            </strong>{" "}
            ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3, gap: 1 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{
              borderRadius: "10px",
              borderColor: isDark ? "#3d3560" : "#e5e0f8",
              color: isDark ? "#8b8fa8" : "#6b7280",
              "&:hover": { background: isDark ? "#2a2550" : "#f3f0ff" },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              borderRadius: "10px",
              background: "#ef4444",
              "&:hover": { background: "#dc2626" },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const EventList = () => (
  <List
    sx={{
      "& .RaList-content": {
        background: "transparent",
        boxShadow: "none",
      },
      "& .RaList-main": {
        background: "transparent",
      },
    }}
  >
    <EventRowList />
  </List>
);