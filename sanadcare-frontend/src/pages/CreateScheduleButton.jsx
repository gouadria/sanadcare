import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import api from '../services/api';

function CreateScheduleButton({ doctorId, onScheduleCreated }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateSchedule = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/api/schedules/weekly/${doctorId}`);
      setMessage('Planning créé avec succès !');
      console.log('Weekly Schedule:', res.data);
      if (onScheduleCreated) {
        onScheduleCreated();
      }
    } catch (error) {
      console.error('Erreur lors de la création du planning :', error.response?.data || error.message);
      setMessage('Erreur lors de la création du planning.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="primary" onClick={handleCreateSchedule} disabled={loading}>
        {loading ? 'Création en cours...' : 'Créer le planning de la semaine'}
      </Button>
      {message && <Typography sx={{ mt: 1 }}>{message}</Typography>}
    </Box>
  );
}

export default CreateScheduleButton;

