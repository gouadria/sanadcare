using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data;
using SanadCare.API.Data.Models;

namespace SanadCare.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowFrontend")]
    public class DepartmentsController : ControllerBase
    {
        private readonly SanadCareDbContext _context;

        public DepartmentsController(SanadCareDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _context.Departments.ToListAsync();
            return Ok(departments);
        }
        [HttpGet("api/departments")]
        public IActionResult GetDepartments()
        {
            var departments = _context.Departments
                .Where(d => d.Name.ToLower() != "administration" && d.Name.ToLower() != "infermiere")
                .ToList();
            return Ok(departments);
        }

    }
}

