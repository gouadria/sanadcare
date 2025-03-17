using System.Collections.Generic;

namespace SanadCare.API.Data.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public List<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
}


