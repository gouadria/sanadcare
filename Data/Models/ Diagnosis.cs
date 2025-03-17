namespace SanadCare.API.Data.Models
{
    public class Diagnosis
    {
        public int Id { get; set; }
        public string Condition { get; set; } = default!;
        public string Description { get; set; } = default!;
    }
}


