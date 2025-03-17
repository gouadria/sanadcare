using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data;
using SanadCare.API.Data.Dtos;
using SanadCare.API.Data.Models;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.IO;

namespace SanadCare.API.Controllers
{
    [ApiController]
    [Route("api/doctors")]
    [EnableCors("AllowFrontend")]
    [AllowAnonymous] // Permet l'accès sans authentification
    public class DoctorsController : ControllerBase
    {
        private readonly SanadCareDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;

        public DoctorsController(SanadCareDbContext context, UserManager<ApplicationUser> userManager, IWebHostEnvironment environment)
        {
            _context = context;
            _userManager = userManager;
            _environment = environment;
        }

        // GET: api/doctors
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _context.Doctors
                .Include(d => d.Department)
                .Include(d => d.Visits) // Charger également les visites pour chaque médecin
                .ToListAsync();
            return Ok(doctors);
        }

        // GET: api/doctors/{id}
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDoctorById(string id)
        {
            var doctor = await _context.Doctors
              .Include(d => d.Department)
              .Include(d => d.Visits)
              .ThenInclude(v => v.Patient)
              .FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                return NotFound("Médecin non trouvé.");
            }
            return Ok(doctor);
        }

        // GET: api/doctors/{doctorId}/availability?date=...
        [HttpGet("{doctorId}/availability")]
        [AllowAnonymous]
        public IActionResult CheckAvailability(string doctorId, [FromQuery] DateTime date)
        {
            // Calcul de la tranche horaire (1 heure)
            var startHour = date.Date.AddHours(date.Hour);
            var endHour = startHour.AddHours(1);

            int count = _context.MedicalVisits
                .Count(vm => vm.DoctorId == doctorId && vm.Date >= startHour && vm.Date < endHour);

            bool available = count < 5;
            return Ok(new { available });
        }

        // POST: api/doctors
        // Endpoint pour créer un nouveau médecin
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] DoctorCreateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var doctor = new Doctor
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                Specialty = dto.Specialty,
                DepartmentId = dto.DepartmentId,
                Degree = dto.Degree,
                YearsOfExperience = dto.YearsOfExperience
            };

            // Traitement du fichier image
            if (dto.Photo != null && dto.Photo.Length > 0)
            {
                try
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Photo.FileName);
                    var folderPath = Path.Combine(_environment.WebRootPath, "assets");
                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }
                    var filePath = Path.Combine(folderPath, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Photo.CopyToAsync(stream);
                    }
                    doctor.PhotoUrl = fileName;
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Erreur lors de la sauvegarde de l'image : {ex.Message}");
                }
            }
            else
            {
                doctor.PhotoUrl = "default.jpg";
            }

            var result = await _userManager.CreateAsync(doctor, dto.Password);
            if (result.Succeeded)
            {
                return Ok(doctor);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
    }
}



