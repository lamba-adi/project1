using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HousingApp.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "rentTure",
                table: "Upload_DataModel",
                newName: "rentTenure");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "rentTenure",
                table: "Upload_DataModel",
                newName: "rentTure");
        }
    }
}
