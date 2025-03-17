using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data.Models;

namespace SanadCare.API.Data
{
    // Utilise ApplicationUser pour gérer l'ensemble des utilisateurs (docteurs et patients)
    public class SanadCareDbContext : IdentityDbContext<ApplicationUser>
    {
        public SanadCareDbContext(DbContextOptions<SanadCareDbContext> options)
            : base(options)
        {
        }

        // Vos DbSet existants
        public DbSet<Prescription> Prescriptions { get; set; } = null!;
        public DbSet<Diagnosis> Diagnoses { get; set; } = null!;
        public DbSet<Department> Departments { get; set; } = null!;
        public DbSet<MedicalVisit> MedicalVisits { get; set; } = null!;
        public DbSet<MedicalRecord> MedicalRecords { get; set; } = null!;
        public DbSet<Doctor> Doctors { get; set; } = null!;
        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Schedule> Schedules { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Appeler la configuration par défaut d'Identity avec ApplicationUser
            base.OnModelCreating(modelBuilder);

            // Configuration de la relation 1-1 entre Patient et MedicalRecord
            modelBuilder.Entity<Patient>()
                .HasOne(p => p.MedicalRecord)
                .WithOne(mr => mr.Patient)
                .HasForeignKey<MedicalRecord>(mr => mr.PatientId);

            // Données de test pour les départements
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "Cardiologie" },
                new Department { Id = 2, Name = "Pédiatrie" },
                new Department { Id = 3, Name = "Neurologie" },
                new Department { Id = 6, Name = "Psychiatrie" },
                new Department { Id = 7, Name = "Dermatologie" },
                new Department { Id = 8, Name = "Néphrologie" },
                new Department { Id = 9, Name = "Immunologie" },
                new Department { Id = 11, Name = "Gynécologie" },
                new Department { Id = 10, Name = "Gastro-entérologie" },
                new Department { Id = 4, Name = "Administration" },
                new Department { Id = 5, Name = "Urgences" }
            );

            // Relation entre Doctor et Department
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.Department)
                .WithMany(dep => dep.Doctors)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relation entre MedicalVisit et Doctor
            modelBuilder.Entity<MedicalVisit>()
                .HasOne(mv => mv.Doctor)
                .WithMany(d => d.Visits)
                .HasForeignKey(mv => mv.DoctorId)
                .OnDelete(DeleteBehavior.NoAction);

            // Relation entre MedicalVisit et Patient
            modelBuilder.Entity<MedicalVisit>()
                .HasOne(mv => mv.Patient)
                .WithMany() // Si vous voulez, vous pouvez définir une navigation dans ApplicationUser ou Patient
                .HasForeignKey(mv => mv.PatientId)
                .OnDelete(DeleteBehavior.NoAction);

            // Optionnel : Renommer les tables Identity
            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers");
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
        }
    }
}

