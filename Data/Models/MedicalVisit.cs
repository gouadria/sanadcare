using SanadCare.API.Data.Models;

public class MedicalVisit
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string DoctorId { get; set; } = default!;
    public Doctor Doctor { get; set; } = default!;

    // Référence vers le patient
    public string PatientId { get; set; } = default!;
    public Patient Patient { get; set; } = default!;

    public string Notes { get; set; } = default!;
    public decimal VisitPrice { get; set; }
}



