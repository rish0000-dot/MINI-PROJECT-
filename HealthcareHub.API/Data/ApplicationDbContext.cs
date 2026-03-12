
using Microsoft.EntityFrameworkCore;
using HealthcareHub.API.Models;

namespace HealthcareHub.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.GoogleId)
                .IsUnique();
        }
    }
}
