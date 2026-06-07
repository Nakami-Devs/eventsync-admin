import React from 'react';
import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton, Filter, TextInput, NumberInput } from 'react-admin';
import { Card, CardContent, Typography, Box, Chip, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '20px',
  margin: theme.spacing(2),
  overflow: 'hidden',
}));

const RoomCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid #e9ecef',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
}));

const Filters = (props: any) => (
  <Filter {...props}>
    <TextInput label="Nom de la salle" source="name" alwaysOn />
    <NumberInput label="Capacité minimum" source="capacity_min" />
  </Filter>
);

export const RoomsList = (props: any) => {
  return (
    <List {...props} filters={<Filters />}>
      <Datagrid 
        rowClick="edit"
        sx={{
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#f7fafc',
            fontWeight: 'bold',
            color: '#2d3748',
          },
          '& .RaDatagrid-row:hover': {
            backgroundColor: '#f7fafc',
          },
        }}
      >
        <TextField source="name" label="Nom de la salle" />
        <NumberField source="capacity" label="Capacité" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const RoomsListGrid = (props: any) => {
  const { data, isLoading } = props;
  
  const handleEdit = (id: string) => {
    console.log('Modifier la salle:', id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      console.log('Supprimer la salle:', id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ background: '#f7fafc', minHeight: '100vh' }}>
        <StyledCard>
          <Box sx={{ p: 3, color: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Gestion des Salles
            </Typography>
          </Box>
        </StyledCard>
        <Grid container spacing={2} sx={{ p: 3 }}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card sx={{ p: 2 }}>
                <Typography>Chargement...</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const rooms = data ? Object.values(data).map((room: any) => ({
    ...room,
    sessions: Math.floor(Math.random() * 6)
  })) : [];

  return (
    <Box sx={{ background: '#f7fafc', minHeight: '100vh' }}>
      <StyledCard>
        <Box sx={{ p: 3, color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Gestion des Salles
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            Gérez toutes les salles de votre établissement
          </Typography>
        </Box>
      </StyledCard>
      
      <Grid container spacing={2} sx={{ p: 3 }}>
        {rooms.map((room: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
            <RoomCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {room.name}
                  </Typography>
                  <Chip 
                    label={`${room.sessions || 0} sessions`} 
                    size="small"
                    sx={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    👥 Capacité:
                  </Typography>
                  <Chip 
                    label={`${room.capacity} personnes`} 
                    size="small"
                    sx={{ backgroundColor: '#e2e8f0', color: '#4a5568' }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  📅 {room.sessions || 0} session(s) planifiée(s)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, pt: 1, borderTop: '1px solid #e2e8f0' }}>
                  <Button 
                    size="small" 
                    onClick={() => handleEdit(room.id)}
                    sx={{ color: '#4299e1' }}
                  >
                    ✏️ Modifier
                  </Button>
                  <Button 
                    size="small" 
                    onClick={() => handleDelete(room.id)}
                    sx={{ color: '#f56565' }}
                  >
                    🗑️ Supprimer
                  </Button>
                </Box>
              </CardContent>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};