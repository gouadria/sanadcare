using System;

namespace SanadCare.API.Data.Dtos
{
    public class AppointmentDto
    {
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public DateTime Date { get; set; }
        public string DepartmentId { get; set; } = default!;
        public string DoctorId { get; set; } = default!;
        public string Message { get; set; } = default!;
    }
}
