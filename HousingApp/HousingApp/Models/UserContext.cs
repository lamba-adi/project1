
using HousingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HousingApplication.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}