import {
  List,
  useListContext,
  RecordContextProvider,
  DeleteWithConfirmButton,
  EditButton,
  useRedirect,
  TopToolbar,
  CreateButton,
  ExportButton,
} from "react-admin";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

const SpeakerListActions = () => (
  <TopToolbar>
    <ExportButton />
    <CreateButton label="Créer" />
  </TopToolbar>
);
    
const SpeakerGrid = () => {
  const { data, isPending } = useListContext();
  const redirect = useRedirect();

  if (isPending)
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        Chargement...
      </Box>
    );

  if (!data || data.length === 0)
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        Aucun intervenant trouvé.
      </Box>
    );

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {data.map((speaker) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={speaker.id}>
          <RecordContextProvider value={speaker}>
            <Card
              sx={{
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.2s",
                height: "160px",
                width: "275px",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: "0 4px 16px rgba(124,58,237,0.15)",
                  borderColor: "#7C3AED",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  p: "14px !important",
                  gap: 1.5,
                }}
              >
                <Box
                  onClick={() => redirect("show", "speakers", speaker.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                    cursor: "pointer",
                    overflow: "hidden", // empêche le débordement
                    "&:hover": { opacity: 0.85 },
                  }}
                >
                  <Avatar
                    src={speaker.profile_pic}
                    alt={speaker.full_name}
                    variant="rounded"
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      borderRadius: "10px",
                      border: "2px solid #7C3AED",
                    }}
                  />

                  <Box sx={{ overflow: "hidden", minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: "text.primary",
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.3,
                      }}
                    >
                      {speaker.full_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "text.secondary",
                        mt: 0.3,
                      }}
                    >
                      {speaker.sessions?.length ?? 0} sessions
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <EditButton
                    label="Modifier"
                    sx={{
                      flex: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.primary",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "13px",
                      height: "36px",
                      "&:hover": {
                        background: "rgba(124,58,237,0.08)",
                        borderColor: "#7C3AED",
                      },
                    }}
                  />

                  <DeleteWithConfirmButton
                    confirmTitle="Supprimer l'intervenant ?"
                    confirmContent="Êtes-vous sûr ? Cette action est irréversible."
                    label=""
                    sx={{
                      background: "#DC2626",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "36px",
                      width: "36px",
                      height: "36px",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      "& .MuiButton-startIcon": { margin: 0 },
                      "&:hover": { background: "#B91C1C" },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </RecordContextProvider>
        </Grid>
      ))}
    </Grid>
  );
};

export const SpeakerList = () => (
  <List
    sx={{
      "& .RaList-content": { background: "transparent", boxShadow: "none" },
      "& .MuiToolbar-root": { background: "transparent" },
    }}
  >
    <SpeakerGrid />
  </List>
);