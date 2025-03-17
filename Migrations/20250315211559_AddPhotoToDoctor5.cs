using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanadCare.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoToDoctor5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "VisitPrice",
                table: "MedicalVisits",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VisitPrice",
                table: "MedicalVisits");
        }
    }
}
