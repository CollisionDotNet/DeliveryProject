
using Microsoft.EntityFrameworkCore;

namespace DeliveryProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();

            string? deliveryDBConnectionString = builder.Configuration.GetConnectionString("DeliveryDBConnection");
            builder.Services.AddDbContext<DeliveryDBContext>(
                options =>
                {
                    options.UseSqlServer(deliveryDBConnectionString);
                });

            builder.Services.AddRouting(
                options =>
                {
                    options.LowercaseQueryStrings = true;
                    options.LowercaseUrls = true;
                });
            builder.Services.AddCors(
                options =>
                {
                    options.AddDefaultPolicy(
                        policy =>
                        {
                            policy.WithOrigins("http://localhost:3000");
                            policy.AllowAnyHeader();
                            policy.AllowAnyMethod();
                        });
                });
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
             
            app.MapControllers();
            app.UseCors();
            app.Run();
        }
    }
}
