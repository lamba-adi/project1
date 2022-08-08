using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HousingApp.Migrations
{
    public partial class secondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Upload_DataModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    typeOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sizeOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    costOfHouse = table.Column<int>(type: "int", nullable: false),
                    rent = table.Column<int>(type: "int", nullable: false),
                    rentTure = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Upload_DataModel", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Upload_DataModel");
        }
    }
}
