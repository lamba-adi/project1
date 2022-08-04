using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HousingApp.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admindata",
                columns: table => new
                {
                    EmpEmail = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EmpPassword = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admindata", x => x.EmpEmail);
                });

            migrationBuilder.CreateTable(
                name: "empdata",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MemberSince = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empdata", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Housing_Approval",
                columns: table => new
                {
                    entryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Organisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SizeOfHouse = table.Column<int>(type: "int", nullable: false),
                    CostOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rent = table.Column<int>(type: "int", nullable: false),
                    Tenure = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Housing_Approval", x => x.entryID);
                });

            migrationBuilder.CreateTable(
                name: "Housing_Approved",
                columns: table => new
                {
                    entryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Organisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SizeOfHouse = table.Column<int>(type: "int", nullable: false),
                    CostOfHouse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rent = table.Column<int>(type: "int", nullable: false),
                    Tenure = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Housing_Approved", x => x.entryID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admindata");

            migrationBuilder.DropTable(
                name: "empdata");

            migrationBuilder.DropTable(
                name: "Housing_Approval");

            migrationBuilder.DropTable(
                name: "Housing_Approved");
        }
    }
}
