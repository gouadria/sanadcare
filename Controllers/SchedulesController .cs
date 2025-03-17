using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data;
using SanadCare.API.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;

namespace SanadCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    public class SchedulesController : ControllerBase
    {
        private readonly SanadCareDbContext _context;

        public SchedulesController(SanadCareDbContext context)
        {
            _context = context;
        }

        // GET: api/schedules/weekly/{doctorId}
        [HttpGet("weekly/{doctorId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetWeeklySchedule(string doctorId)
        {
            // Ici, on récupère le planning pour la semaine prochaine (du lundi au vendredi)
            var today = DateTime.Today;
            // Calculer le nombre de jours jusqu'au prochain lundi
            int daysUntilMonday = ((int)DayOfWeek.Monday - (int)today.DayOfWeek + 7) % 7;
            if (daysUntilMonday == 0)
                daysUntilMonday = 7; // si aujourd'hui est lundi, on choisit le lundi suivant
            var startDate = today.AddDays(daysUntilMonday);
            var endDate = startDate.AddDays(5);

            var schedules = await _context.Schedules
                .Where(s => s.DoctorId == doctorId && s.Date >= startDate && s.Date < endDate)
                .OrderBy(s => s.Date)
                .ToListAsync();

            if (schedules == null || schedules.Count == 0)
            {
                return NotFound("Aucun emploi du temps trouvé pour la semaine.");
            }
            return Ok(schedules);
        }

        // POST: api/schedules/weekly/{doctorId}
        // Crée un planning hebdomadaire pour les 5 prochains jours ouvrés selon le type de personnel
        [HttpPost("weekly/{doctorId}")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateWeeklySchedule(string doctorId)
        {
            // Récupérer le médecin avec son département pour déterminer son type
            var doctor = await _context.Doctors
                .Include(d => d.Department)
                .FirstOrDefaultAsync(d => d.Id == doctorId);
            if (doctor == null)
            {
                return NotFound("Médecin non trouvé.");
            }

            var createdSchedules = new List<Schedule>();

            // Déterminer le prochain lundi
            var today = DateTime.Today;
            int daysUntilMonday = ((int)DayOfWeek.Monday - (int)today.DayOfWeek + 7) % 7;
            if (daysUntilMonday == 0)
                daysUntilMonday = 7;
            var date = today.AddDays(daysUntilMonday);

            int daysCreated = 0;
            // Créer un planning pour 5 jours ouvrés consécutifs
            while (daysCreated < 5)
            {
                // Si c'est un week-end, passez au jour suivant
                if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                {
                    date = date.AddDays(1);
                    continue;
                }

                // Vérifier s'il existe déjà un emploi du temps pour ce jour pour ce médecin
                var existing = await _context.Schedules
                    .FirstOrDefaultAsync(s => s.DoctorId == doctorId && s.Date.Date == date);
                if (existing != null)
                {
                    date = date.AddDays(1);
                    continue;
                }

                string shift;
                if (doctor.Department.Name.ToLower() == "administration")
                {
                    // Administrateur : 8h de travail par jour (par exemple "8h-16h")
                    shift = "8h-16h";
                }
                else
                {
                    // Pour les médecins, attribuer des shifts différents :
                    // Par exemple : lundi et mardi "Matin (6h)", mercredi et jeudi "Soir (6h)", vendredi "Nuit (jusqu'à 00h)"
                    switch (daysCreated)
                    {
                        case 0:
                        case 1:
                            shift = "Matin (6h)";
                            break;
                        case 2:
                        case 3:
                            shift = "Soir (6h)";
                            break;
                        case 4:
                            shift = "Nuit (jusqu'à 00h)";
                            break;
                        default:
                            shift = "Matin (6h)";
                            break;
                    }
                }

                var schedule = new Schedule
                {
                    DoctorId = doctorId,
                    Date = date,
                    Shift = shift
                };

                _context.Schedules.Add(schedule);
                createdSchedules.Add(schedule);
                daysCreated++;
                date = date.AddDays(1);
            }

            await _context.SaveChangesAsync();
            return Ok(createdSchedules);
        }
    }
}


