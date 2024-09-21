using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using DeliveryProject.Models;

namespace DeliveryProject.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder
                .HasKey(o => o.Id);
            builder
                .Property(o => o.Id)
                .ValueGeneratedOnAdd();

            builder
                .HasOne(o => o.SenderCity)
                .WithMany(c => c.SenderOrders)
                .HasForeignKey(o => o.SenderCityId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder
                .HasOne(o => o.RecipientCity)
                .WithMany(c => c.RecipientOrders)
                .HasForeignKey(o => o.RecipientCityId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
            // Проверка того, что столбцы SenderAddress и RecipientAddress - непустые строки, выполняется через аннотации данных в модели
            builder
                .Property(o => o.SenderAddress)
                .IsRequired()
                .HasMaxLength(Order.addressMaxLength);

            builder
                .Property(o => o.RecipientAddress)
                .IsRequired()
                .HasMaxLength(Order.addressMaxLength);
            // Проверка неотрицательности Weight - также через аннотации данных в модели
            builder
                .Property(o => o.Weight)
                .IsRequired();

            builder
                .Property(o => o.PickupDate)
                .IsRequired();
        }
    }
}