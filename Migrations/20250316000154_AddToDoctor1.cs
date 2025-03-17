using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanadCare.API.Migrations
{
    /// <inheritdoc />
    public partial class AddToDoctor1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "MedicalVisits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatientName",
                table: "MedicalVisits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "MedicalVisits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "MedicalVisits");

            migrationBuilder.DropColumn(
                name: "PatientName",
                table: "MedicalVisits");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "MedicalVisits");
        }
    }
}
