using Microsoft.EntityFrameworkCore;
using WTFTN.Domain.Entities;

namespace WTFTN.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Location> Locations => Set<Location>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Location>()
                .Property(x => x.Category)
                .HasConversion<string>();
        }
    }
}