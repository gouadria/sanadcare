using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SanadCare.API.Data.Models
{
    public class Doctor : ApplicationUser
    {
        // Propriétés spécifiques pour le médecin
      
        public string Specialty { get; set; } = default!;
        public string PhotoUrl { get; set; } = default!;
        public string Degree { get; set; } = default!;

        // Nouveau champ pour le nombre d'années d'expérience
        public int YearsOfExperience { get; set; }

        // Propriété pour la relation avec le département
        public int DepartmentId { get; set; }
        public Department Department { get; set; } = default!;

        // Collection des visites réalisées par le médecin
        public List<MedicalVisit> Visits { get; set; } = new List<MedicalVisit>();
    }
}
