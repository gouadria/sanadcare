using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanadCare.API.Migrations
{
    /// <inheritdoc />
    public partial class FixMedicalVisitRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId",
                table: "MedicalVisits");

            migrationBuilder.AddColumn<string>(
                name: "DoctorId1",
                table: "MedicalVisits",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalVisits_DoctorId1",
                table: "MedicalVisits",
                column: "DoctorId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId",
                table: "MedicalVisits",
                column: "DoctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId1",
                table: "MedicalVisits",
                column: "DoctorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId",
                table: "MedicalVisits");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.DropIndex(
                name: "IX_MedicalVisits_DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.DropColumn(
                name: "DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId",
                table: "MedicalVisits",
                column: "DoctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
