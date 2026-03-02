using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

// DB (SQLite)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity + Roles
builder.Services
    .AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddRazorPages();

var app = builder.Build();

// Apply migrations + seed admin role/user + seed default QR code
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();

    // ---- Seed Admin Role + assign to bootstrap email (if exists) ----
    const string adminRole = "Admin";
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    if (!await roleManager.RoleExistsAsync(adminRole))
        await roleManager.CreateAsync(new IdentityRole(adminRole));

    var adminEmail = app.Configuration["AdminBootstrapEmail"]; // set in appsettings.json
    if (!string.IsNullOrWhiteSpace(adminEmail))
    {
        // Ensure the configured email is Admin (if user exists)
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser != null && !await userManager.IsInRoleAsync(adminUser, adminRole))
            await userManager.AddToRoleAsync(adminUser, adminRole);

        // Enforce single-admin: remove Admin role from everyone else
        var admins = await userManager.GetUsersInRoleAsync(adminRole);
        foreach (var u in admins)
        {
            if (!string.Equals(u.Email, adminEmail, StringComparison.OrdinalIgnoreCase))
                await userManager.RemoveFromRoleAsync(u, adminRole);
        }
    }

    // ---- Seed a default QR code for testing ----
    if (!db.QrCodes.Any(q => q.Code == "MASCK10"))
    {
        db.QrCodes.Add(new QrCode
        {
            Code = "MASCK10",
            PointsValue = 10,
            IsActive = true
        });
        await db.SaveChangesAsync();
    }
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();