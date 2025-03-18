import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import api from '../services/api';
import CreateScheduleButton from './CreateScheduleButton'; // Pour créer le planning
import AvailabilityTracker from './AvailabilityTracker'; // Composant pour le suivi des disponibilités

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // L'endpoint doit renvoyer le médecin avec la collection Visits et chaque visite avec Patient
        const res = await api.get(`/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du médecin", error);
      }
    };
    fetchDoctor();
  }, [id]);

  // Fonction pour récupérer le planning hebdomadaire (dans l'onglet Emplois du temps)
  const fetchWeeklySchedule = async () => {
    try {
      const res = await api.get(`/api/schedules/weekly/${id}`);
      setWeeklySchedule(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du planning hebdomadaire", error);
      setWeeklySchedule([]);
    }
  };

  useEffect(() => {
    if (tabIndex === 0 && doctor) {
      fetchWeeklySchedule();
    }
  }, [tabIndex, doctor]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Callback pour rafraîchir le planning après création
  const handleScheduleCreated = () => {
    fetchWeeklySchedule();
  };

  if (!doctor) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        {doctor.department && doctor.department.name.toLowerCase() === "administration"
          ? "Détails du Personnel Administratif"
          : "Détails du Médecin"} : {doctor.fullName || doctor.FullName}
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Emplois du temps" />
        <Tab label="Visites" />
        <Tab label="Suivi des disponibilités" />
        <Tab label="Profils" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Planning de la semaine
            </Typography>
            {weeklySchedule.length > 0 ? (
              weeklySchedule.map((s) => (
                <Box key={s.id} sx={{ mb: 1 }}>
                  <Typography>
                    {new Date(s.date).toLocaleDateString()} - {s.shift}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>Aucun planning pour cette semaine.</Typography>
            )}
            <CreateScheduleButton doctorId={doctor.id} onScheduleCreated={handleScheduleCreated} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Visites
            </Typography>
            {doctor.visits && doctor.visits.length > 0 ? (
              doctor.visits.map((visit) => (
                <Box key={visit.id} sx={{ mb: 1 }}>
                  <Typography>
                    {new Date(visit.date).toLocaleString()} - Patient:{" "}
                    {visit.patient && (visit.patient.fullName || visit.patient.FullName)} - {visit.notes}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>Aucune visite enregistrée pour ce médecin.</Typography>
            )}
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Suivi des disponibilités
            </Typography>
            <AvailabilityTracker doctorId={doctor.id} />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
              borderRadius: 2,
              color: '#333',
              boxShadow: 3
            }}
          >
            <Typography variant="h6" gutterBottom>
              {doctor.department && doctor.department.name.toLowerCase() === "administration"
                ? "CV du Personnel Administratif"
                : "CV du Médecin"}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {doctor.photoUrl ? (
                <img
                  src={`/assets/${doctor.photoUrl}`}
                  alt={doctor.fullName || doctor.FullName}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '16px',
                    border: '2px solid #fff'
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#ccc',
                    marginRight: '16px'
                  }}
                />
              )}
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {doctor.fullName || doctor.FullName}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email :</strong> {doctor.email || doctor.Email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Spécialité :</strong> {doctor.specialty || doctor.Specialty}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Diplôme :</strong> {doctor.degree || doctor.Degree}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Expérience :</strong> {doctor.yearsOfExperience || doctor.YearsOfExperience} ans
            </Typography>
            {doctor.department && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Département :</strong> {doctor.department.name || doctor.Department?.name}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default DoctorDetails;










