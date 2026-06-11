import { Create, SimpleForm, TextInput, NumberInput, required, minValue, maxValue } from 'react-admin';
import { Card, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '20px',
  margin: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const FormCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  margin: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
}));

export const RoomCreate = (props: any) => {
  return (
    <Box sx={{ background: '#f7fafc', minHeight: '100vh', p: 2 }}>
      <StyledCard>
        <Box sx={{ p: 3, color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            ➕ Nouvelle salle
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
            Créez une nouvelle salle pour vos événements
          </Typography>
        </Box>
      </StyledCard>

      <FormCard>
        <Create {...props} sx={{ '& .RaCreate-main': { background: 'transparent' } }} redirect="list">
          <SimpleForm
            sx={{
              p: 3,
              '& .MuiTextField-root': { mb: 2 },
              '& .MuiInputLabel-root': { fontWeight: 500, color: '#2d3748' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          >
            <TextInput
              source="name"
              label="Nom de la salle"
              placeholder="Ex: Amphithéâtre, Salle de conférence..."
              validate={[required('Le nom de la salle est requis')]}
              fullWidth
              sx={{ mb: 3 }}
            />
            
            <NumberInput
              source="capacity"
              label="Capacité (nombre de personnes)"
              placeholder="Ex: 50"
              validate={[
                required('La capacité est requise'),
                minValue(1, 'La capacité doit être d\'au moins 1 personne'),
                maxValue(1000, 'La capacité ne peut pas dépasser 1000 personnes')
              ]}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mt: 3,
              '& button': {
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
                fontWeight: 600,
              }
            }}>
              <button 
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Créer la salle
              </button>
            </Box>
          </SimpleForm>
        </Create>
      </FormCard>
    </Box>
  );
};