using DeliveryProject.Configurations;
using DeliveryProject.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryProject
{
    public class DeliveryDBContext : DbContext
    {
        public DbSet<City> Cities { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DeliveryDBContext(DbContextOptions<DeliveryDBContext> options) : base(options) 
        { 
        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CityConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
        }
    }
}
