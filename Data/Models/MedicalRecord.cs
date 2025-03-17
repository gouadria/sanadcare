using System.Collections.Generic;

namespace SanadCare.API.Data.Models
{
    public class MedicalRecord
    {
        public int Id { get; set; }
        public string PatientId { get; set; } = default!;
        public Patient Patient { get; set; } = default!;
        public List<MedicalVisit> Visits { get; set; } = new List<MedicalVisit>();
        public List<Prescription> Prescriptions { get; set; } = new List<Prescription>();
        public List<Diagnosis> Diagnoses { get; set; } = new List<Diagnosis>();
    }
}


