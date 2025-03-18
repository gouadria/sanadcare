import { useEffect, useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { 
  People as PatientsIcon,
  MedicalServices as StaffIcon,
  LocalHospital as HospitalIcon,
  CalendarToday as ScheduleIcon,
  MonetizationOn as BillingIcon,
  Notifications as RemindersIcon 
} from '@mui/icons-material';
import { BarChart, StatCard } from '../components';
import { Link } from 'react-router-dom'; // ← Import Link
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    revenue: 0,
    bedOccupancy: 0,
    monthlyAppointments: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/admin/dashboard');
      setStats(response.data);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar latérale */}
      <Box sx={{
        width: 240,
        bgcolor: 'background.paper',
        p: 2,
        boxShadow: 1,
        position: 'fixed',
        height: '100vh'
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Menu principal
        </Typography>
        <Divider />
        
        <List component="nav">
          {/* Lien vers la gestion des patients */}
          <ListItem 
            button 
            component={Link} 
            to="/dashboard/patients" 
          >
            <ListItemIcon><PatientsIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Gestion des patients" />
          </ListItem>

          {/* Lien vers le personnel médical */}
          <ListItem 
            button 
            component={Link} 
            to="/admin/staff"  // ← URL correcte
            sx={{ 
              '&:hover': { bgcolor: 'action.hover' },
              transition: 'background-color 0.2s'
            }}
          >
            <ListItemIcon><StaffIcon color="secondary" /></ListItemIcon>
            <ListItemText primary="Personnel médical" />
          </ListItem>

          {/* Autres liens */}
          <ListItem button component={Link} to="/hospitalization">
            <ListItemIcon><HospitalIcon color="success" /></ListItemIcon>
            <ListItemText primary="Hospitalisations" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/treatments">
            <ListItemIcon><ScheduleIcon color="warning" /></ListItemIcon>
            <ListItemText primary="Suivi des traitements" />
          </ListItem>
          <ListItem button component={Link} to="/billing">
            <ListItemIcon><BillingIcon color="error" /></ListItemIcon>
            <ListItemText primary="Facturation" />
          </ListItem>
          <ListItem button component={Link} to="/reminders">
            <ListItemIcon><RemindersIcon color="info" /></ListItemIcon>
            <ListItemText primary="Rappels" />
          </ListItem>
        </List>
      </Box>

      {/* Contenu principal */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3, 
        marginLeft: '240px', 
        marginTop: '64px' 
      }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Tableau de bord administratif
        </Typography>
        
        <Grid container spacing={3}>
          {/* Vos cartes statistiques */}
          <Grid item xs={12} md={3}>
            <StatCard 
              title="Patients" 
              value={stats.totalPatients} 
              icon="👥"
              color="bg-blue-500"
            />
          </Grid>
          {/* ... autres cartes */}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <BarChart 
            title="Évolution mensuelle des consultations"
            data={stats.monthlyAppointments}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;