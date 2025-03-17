namespace SanadCare.API.Data.Models
{
    public class Prescription
    {
        public int Id { get; set; }
        public string Medication { get; set; } = default!;
        public string Dosage { get; set; } = default!;
        public int DurationInDays { get; set; }
    }
}


