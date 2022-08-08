
using HousingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HousingApplication.Models
{
    public class HousingDbContext : DbContext
    {
        public HousingDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<EmployeeModel> empdata { get; set; }

        public DbSet<adminLoginModel> admindata { get; set; }

        public DbSet<housingApprovalModel> Housing_Approval { get; set; }

        public DbSet<housingApprovedModel> Housing_Approved { get; set; }
        public DbSet<UploadDataModel> Upload_DataModel { get; set; }
  }
}
