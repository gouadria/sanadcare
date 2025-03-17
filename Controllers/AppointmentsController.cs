using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data;
using SanadCare.API.Data.Dtos;
using SanadCare.API.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SanadCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    [AllowAnonymous] // Permet l'accès sans authentification
    public class AppointmentsController : ControllerBase
    {
        private readonly SanadCareDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AppointmentsController(SanadCareDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST: api/appointments/create/{doctorId}
        [HttpPost("create/{doctorId}")]
        public async Task<IActionResult> CreateVisit(string doctorId, [FromBody] AppointmentDto appointment)
        {
            // Récupérer le médecin
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Id == doctorId);
            if (doctor == null)
                return NotFound("Médecin non trouvé.");

            // On ne prend que la date demandée (on ignore la partie heure du client)
            var requestedDate = appointment.Date.Date;

            // Définition des heures de travail par défaut (par exemple, de 9h à 17h)
            int startWorkingHour = 9;
            int endWorkingHour = 17; // La plage horaire sera de 9h à 16h (chaque créneau d'une heure)
            DateTime? selectedDateTime = null;
            int maxAppointmentsPerSlot = 3; // Le médecin peut prendre 3 patients par heure

            // Boucle sur chaque créneau horaire pour trouver le premier créneau disponible
            for (int hour = startWorkingHour; hour < endWorkingHour; hour++)
            {
                var slotStart = requestedDate.AddHours(hour);
                var slotEnd = slotStart.AddHours(1);
                int count = await _context.MedicalVisits
                    .CountAsync(vm => vm.DoctorId == doctorId && vm.Date >= slotStart && vm.Date < slotEnd);
                if (count < maxAppointmentsPerSlot)
                {
                    selectedDateTime = slotStart;
                    break;
                }
            }

            if (selectedDateTime == null)
            {
                return BadRequest("Aucun créneau disponible pour ce jour pour le docteur sélectionné.");
            }

            // Définition du prix de la visite en fonction de la spécialité du médecin
            var priceMapping = new Dictionary<string, decimal>(StringComparer.OrdinalIgnoreCase)
            {
                { "cardiologie", 150 },
                { "pédiatrie", 100 },
                { "neurologie", 150 },
                { "psychiatrie", 90 },
                { "dermatologie", 120 },
                { "néphrologie", 130 },
                { "immunologie", 140 },
                { "gynécologie", 100 },
                { "gastro-entérologie", 120 },
                { "urgence", 80 }
            };

            decimal visitPrice = 0;
            if (priceMapping.TryGetValue(doctor.Specialty, out decimal price))
            {
                visitPrice = price;
            }

            // Récupérer ou créer un patient basé sur l'email fourni
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == appointment.Email);
            if (patient == null)
            {
                patient = new Patient
                {
                    UserName = appointment.Email,
                    Email = appointment.Email,
                    PhoneNumber = appointment.Phone,
                    FullName = appointment.Name,
                    NationalId = "",
                    StatusId = 1
                };
                var result = await _userManager.CreateAsync(patient, "Default@1234"); // Mot de passe par défaut
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }

            var visit = new MedicalVisit
            {
                Date = selectedDateTime.Value, // Créneau horaire sélectionné
                DoctorId = doctorId,
                PatientId = patient.Id,
                Notes = appointment.Message,
                VisitPrice = visitPrice
            };

            _context.MedicalVisits.Add(visit);
            await _context.SaveChangesAsync();
            return Ok(visit);
        }

        // GET: api/appointments/doctor/{doctorId}/visits
        // Cette méthode commence par la ligne 66 (à ajuster selon votre éditeur)
        [HttpGet("doctor/{doctorId}/visits")]
        public async Task<IActionResult> GetDoctorVisits(string doctorId)
        {
            var visits = await _context.MedicalVisits
                .Where(v => v.DoctorId == doctorId)
                .ToListAsync();
            return Ok(visits);
        }
    }
}


