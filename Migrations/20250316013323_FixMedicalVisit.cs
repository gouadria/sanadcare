using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanadCare.API.Migrations
{
    /// <inheritdoc />
    public partial class FixMedicalVisit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.DropIndex(
                name: "IX_MedicalVisits_DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.DropColumn(
                name: "DoctorId1",
                table: "MedicalVisits");

            migrationBuilder.DropColumn(
                name: "Patient_FullName",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(21)",
                maxLength: 21,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13);

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "Dermatologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 8,
                column: "Name",
                value: "Néphrologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 9,
                column: "Name",
                value: "Immunologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 10,
                column: "Name",
                value: "Gastro-entérologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 11,
                column: "Name",
                value: "Gynécologie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DoctorId1",
                table: "MedicalVisits",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(21)",
                oldMaxLength: 21);

            migrationBuilder.AddColumn<string>(
                name: "Patient_FullName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "dermatologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 8,
                column: "Name",
                value: "néphrologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 9,
                column: "Name",
                value: "immunologie ");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 10,
                column: "Name",
                value: "gastro-entérologie");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 11,
                column: "Name",
                value: "gunycolgue ");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalVisits_DoctorId1",
                table: "MedicalVisits",
                column: "DoctorId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalVisits_AspNetUsers_DoctorId1",
                table: "MedicalVisits",
                column: "DoctorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
