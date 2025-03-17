using Microsoft.AspNetCore.Identity;

namespace SanadCare.API.Data.Models
{
    public class Patient : ApplicationUser
    {
        // IdentityUser fournit déjà Id, Email, PhoneNumber, etc.
        public string NationalId { get; set; } = default!;
        public int StatusId { get; set; }

        // Relation 1-1 avec le dossier médical
        public MedicalRecord MedicalRecord { get; set; } = default!;
    }
}


