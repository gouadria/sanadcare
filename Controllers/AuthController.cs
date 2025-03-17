using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using SanadCare.API.Data.Models;
using Microsoft.AspNetCore.Cors;

namespace SanadCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("verify")]
        public async Task<IActionResult> Verify()
        {
            // Implémentez ici la logique pour vérifier l'authentification
            // Par exemple, vous pouvez récupérer l'utilisateur via le token d'authentification
            return Ok(new { user = "Exemple d'utilisateur" });
        }
    }
}
