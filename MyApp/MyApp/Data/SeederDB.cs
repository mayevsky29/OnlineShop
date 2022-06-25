using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyApp.Constants;
using MyApp.Data.Entities.Identity;

namespace MyApp.Data
{
    public static class SeederDB
    {
        public static void SeedData(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    logger.LogInformation("Seeding Databases");
                    var context = services.GetRequiredService<AppEFContext>();
                    context.Database.Migrate();
                    SeedRoleAndUser(services);
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        private static void SeedRoleAndUser(IServiceProvider services)
        {
            var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();

            if (!roleManager.Roles.Any())
            {
                var result = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.Admin
                }).Result;

                result = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.User
                }).Result;
            }

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    Email = "admin@gmail.com",
                    UserName = "admin@gmail.com",
                    FirstName = "Василь",
                    SecondName = "Петрук",
                    Phone = "+380983334445",
                    Photo = "user2.jpg"
                };
                var result = userManager.CreateAsync(user, "123456").Result;
                if (result.Succeeded)
                {
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }
            }
        }
    }
}
