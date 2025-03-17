using Microsoft.AspNetCore.Identity;

namespace SanadCare.API.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Propriété commune à tous les utilisateurs (patients et docteurs)
        public string FullName { get; set; } = default!;
        // Vous pouvez ajouter d'autres propriétés communes ici (ex. DateOfBirth, etc.)
    }
}

