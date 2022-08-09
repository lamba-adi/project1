﻿// <auto-generated />
using System;
using HousingApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HousingApp.Migrations
{
    [DbContext(typeof(HousingDbContext))]
    partial class HousingDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("HousingApp.Models.adminLoginModel", b =>
                {
                    b.Property<string>("EmpEmail")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EmpPassword")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmpEmail");

                    b.ToTable("admindata");
                });

            modelBuilder.Entity("HousingApp.Models.EmployeeModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("MemberSince")
                        .HasColumnType("datetime2");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("empdata");
                });

            modelBuilder.Entity("HousingApp.Models.housingApprovalModel", b =>
                {
                    b.Property<int>("entryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("entryID"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CostOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmpID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Organisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rent")
                        .HasColumnType("int");

                    b.Property<int>("SizeOfHouse")
                        .HasColumnType("int");

                    b.Property<int>("Tenure")
                        .HasColumnType("int");

                    b.Property<string>("TypeOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("entryID");

                    b.ToTable("Housing_Approval");
                });

            modelBuilder.Entity("HousingApp.Models.housingApprovedModel", b =>
                {
                    b.Property<int>("entryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("entryID"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CostOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmpID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Organisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rent")
                        .HasColumnType("int");

                    b.Property<int>("SizeOfHouse")
                        .HasColumnType("int");

                    b.Property<int>("Tenure")
                        .HasColumnType("int");

                    b.Property<string>("TypeOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("entryID");

                    b.ToTable("Housing_Approved");
                });

            modelBuilder.Entity("HousingApp.Models.UploadDataModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("area")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("costOfHouse")
                        .HasColumnType("int");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("rent")
                        .HasColumnType("int");

                    b.Property<int>("rentTenure")
                        .HasColumnType("int");

                    b.Property<string>("sizeOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("typeOfHouse")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Upload_DataModel");
                });
#pragma warning restore 612, 618
        }
    }
}
