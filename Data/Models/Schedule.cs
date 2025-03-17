using System;
using System.ComponentModel.DataAnnotations;

namespace SanadCare.API.Data.Models
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }

        // Identifiant du médecin ou du personnel (ici, on suppose que c'est un string correspondant à l'Id d'IdentityUser)
        public string DoctorId { get; set; }

        public DateTime Date { get; set; }

        // Exemple : "Matin", "Après-midi", "Nuit"
        public string Shift { get; set; }
    }
}

