using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DeliveryProject.Models;

namespace DeliveryProject.Configurations
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id)
                .ValueGeneratedOnAdd();

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(City.nameMaxLength);

            builder
                .HasMany(c => c.SenderOrders)
                .WithOne(o => o.SenderCity)
                .HasForeignKey(o => o.SenderCityId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder
                .HasMany(c => c.RecipientOrders)
                .WithOne(o => o.RecipientCity)
                .HasForeignKey(o => o.RecipientCityId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }
    }
}
