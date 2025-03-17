using Microsoft.AspNetCore.Http;

namespace SanadCare.API.Data.Models
{
    public class DoctorCreateDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Specialty { get; set; }
        public int DepartmentId { get; set; }
        public string Degree { get; set; }
        // Nouveau champ pour le nombre d'années d'expérience
        public int YearsOfExperience { get; set; }
        // Rendre le champ Photo optionnel pour éviter la validation si aucun fichier n'est envoyé
        public IFormFile? Photo { get; set; }
    }
}


