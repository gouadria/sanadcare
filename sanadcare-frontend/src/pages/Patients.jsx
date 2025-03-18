import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout de la navigation
import api from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Initialisation de la navigation

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/patients');
      setPatients(response.data);
    };
    fetchData();
  }, []);

  // Définition de la fonction manquante
  const handleView = (patient) => {
    navigate(`/patients/${patient.id}`); // Redirection vers la fiche patient
  };

  const columns = [
    // ... autres colonnes
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => handleView(params.row)} // Maintenant défini
        >
          Voir détails
        </button>
      )
    }
  ];

  return (
    <div className="p-6">
<h2 className="text-2xl font-bold mb-4">Gestion des patients</h2>
<div style={{ height: 400, width: '100%' }}>
<DataGrid
rows={patients}
columns={columns}
pageSize={5}
rowsPerPageOptions={[5]}
checkboxSelection
/>
</div>
</div>
  );
};

export default Patients;


