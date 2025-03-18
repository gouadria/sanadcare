import { useEffect, useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Staff = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Specialty: '',
    DepartmentId: '',
    Degree: '',
    YearsOfExperience: '' // Nouveau champ pour le nombre d'années d'expérience
  });
  const [photo, setPhoto] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, departmentsRes] = await Promise.all([
          api.get('/api/doctors'),
          api.get('/api/departments')
        ]);
        setDoctors(doctorsRes.data);
        setDepartments(departmentsRes.data);
        if (departmentsRes.data.length > 0 && !formData.DepartmentId) {
          setFormData(prev => ({ ...prev, DepartmentId: departmentsRes.data[0].id }));
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('FullName', formData.FullName);
    payload.append('Email', formData.Email);
    payload.append('Password', formData.Password);
    payload.append('Specialty', formData.Specialty);
    payload.append('DepartmentId', formData.DepartmentId); // Laisser en string, le binder convertira en int
    payload.append('Degree', formData.Degree);
    payload.append('YearsOfExperience', formData.YearsOfExperience);
    if (photo) {
      payload.append('Photo', photo);
    }
    
    // Debug : Affichez les clés/valeurs
    // for (let pair of payload.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      // Laissez Axios définir automatiquement le Content-Type
      await api.post('/api/doctors', payload);
      alert('Médecin créé avec succès');
      const doctorsRes = await api.get('/api/doctors');
      setDoctors(doctorsRes.data);
      navigate('/admin/staff');
    } catch (error) {
      console.error('Erreur lors de la création du médecin:', error.response?.data || error.message);
      alert('Erreur :' + JSON.stringify(error.response?.data));
    }
  };

  return (
    <Paper sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Gestion du personnel médical
      </Typography>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 6, backgroundColor: 'white', p: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Ajouter un médecin
        </Typography>
        <TextField 
          label="Nom complet" 
          value={formData.FullName}
          onChange={(e) => setFormData({ ...formData, FullName: e.target.value })}
          fullWidth 
          required 
          sx={{ mb: 2 }}
        />
        <TextField 
          label="Email" 
          type="email" 
          value={formData.Email}
          onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
          fullWidth 
          required 
          sx={{ mb: 2 }}
        />
        <TextField 
          label="Mot de passe" 
          type="password" 
          value={formData.Password}
          onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
          fullWidth 
          required 
          sx={{ mb: 2 }}
        />
        <TextField 
          label="Années d'expérience"
          type="number"
          value={formData.YearsOfExperience}
          onChange={(e) => setFormData({ ...formData, YearsOfExperience: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
          {photo ? 'Image sélectionnée' : "Joindre une image"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPhoto(e.target.files[0]);
              }
            }}
          />
        </Button>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Spécialité</InputLabel>
          <Select
            value={formData.Specialty}
            onChange={(e) => setFormData({ ...formData, Specialty: e.target.value })}
            required
          >
            <MenuItem value="Cardiologie">Cardiologie</MenuItem>
            <MenuItem value="Neurologie">Neurologie</MenuItem>
            <MenuItem value="Pédiatrie">Pédiatrie</MenuItem>
            <MenuItem value="Psychiatrie">Psychiatrie</MenuItem>
            <MenuItem value="dermatologie">dermatologie</MenuItem>
            <MenuItem value="néphrologie">néphrologie</MenuItem>
            <MenuItem value="immunologie">immunologie</MenuItem>
            <MenuItem value="gunycolgue">gunycolgue</MenuItem>
            <MenuItem value="Urgence">Urgence</MenuItem>
            <MenuItem value="gastro-entérologie">gastro-entérologie</MenuItem>
            <MenuItem value="infermiére">infermiére</MenuItem>
            <MenuItem value="Administration">Administration</MenuItem>
            <MenuItem value="chef Manager">chef Manager</MenuItem>
            <MenuItem value="Adjoin administratif">Adjoin administratif</MenuItem>
            <MenuItem value="Secretaire">Secretaire</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Département</InputLabel>
          <Select
            value={formData.DepartmentId}
            onChange={(e) => setFormData({ ...formData, DepartmentId: e.target.value })}
            required
          >
            {departments.map((dep) => (
              <MenuItem key={dep.id} value={dep.id}>
                {dep.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField 
          label="Diplôme" 
          value={formData.Degree}
          onChange={(e) => setFormData({ ...formData, Degree: e.target.value })}
          fullWidth 
          required 
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ display: 'block', mx: 'auto' }}>
          Enregistrer
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Photo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Spécialité</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Département</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Diplôme</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Expérience</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doc) => {
              const fileName = doc.photoUrl;
              return (
                <TableRow key={doc.id} hover>
                  <TableCell>
                    {fileName ? (
                      <img 
                        src={`/assets/${fileName}`} 
                        alt={doc.fullName || doc.FullName} 
                        style={{ width: 50, height: 50, borderRadius: '50%' }} 
                      />
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>{doc.fullName || doc.FullName}</TableCell>
                  <TableCell>{doc.email || doc.Email}</TableCell>
                  <TableCell>{doc.specialty || doc.Specialty}</TableCell>
                  <TableCell>{doc.department?.name || doc.Department?.name}</TableCell>
                  <TableCell>{doc.degree || doc.Degree}</TableCell>
                  <TableCell>{doc.yearsOfExperience || doc.YearsOfExperience}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      color="info" 
                      onClick={() => navigate(`/admin/staff/${doc.id}`)}
                    >
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Staff;

















