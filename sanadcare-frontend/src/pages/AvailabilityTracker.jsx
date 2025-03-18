import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import api from '../services/api';

function AvailabilityTracker({ doctorId }) {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [visits, setVisits] = useState([]);
  const totalSlotsPerDay = 24; // Par exemple : 8 heures x 3 patients par heure

  // Lignes 8-16 : Récupérer toutes les visites du médecin
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await api.get(`/api/appointments/doctor/${doctorId}/visits`);
        setVisits(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des visites", error);
      }
    };
    fetchVisits();
  }, [doctorId]);

  // Lignes 18-32 : Calculer la disponibilité pour chaque jour des 7 prochains jours
  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format "YYYY-MM-DD"
      // Filtrer les visites dont la date (sans l'heure) correspond à formattedDate
      const count = visits.filter(v => {
        // Assurez-vous que la propriété est "date" (minuscule) comme renvoyée par le back-end
        const visitDate = new Date(v.date).toISOString().split('T')[0];
        return visitDate === formattedDate;
      }).length;
      const percentage = ((totalSlotsPerDay - count) / totalSlotsPerDay) * 100;
      days.push({
        date: formattedDate,
        percentage: Math.round(percentage),
        isOnLeave: false // Vous pouvez adapter cette valeur si vous avez une logique de congé
      });
    }
    setAvailabilityData(days);
  }, [doctorId, visits]);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {availabilityData.map(day => (
        <div key={day.date} style={{ width: '80px', textAlign: 'center' }}>
          <CircularProgressbar 
            value={day.percentage} 
            text={day.isOnLeave ? "En congé" : `${day.percentage}%`}
            styles={buildStyles({
              pathColor: day.isOnLeave ? 'gray' : (day.percentage >= 50 ? 'green' : 'red'),
              textColor: day.isOnLeave ? 'gray' : '#000',
              trailColor: '#d6d6d6'
            })}
          />
          <div style={{ fontSize: '0.8em', marginTop: '5px' }}>{day.date}</div>
        </div>
      ))}
    </div>
  );
}

export default AvailabilityTracker;








