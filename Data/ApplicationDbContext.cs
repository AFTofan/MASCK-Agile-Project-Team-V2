using WebApplication1.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
namespace WebApplication1.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<LessonCompletion> LessonCompletions => Set<LessonCompletion>();
        public DbSet<QrCode> QrCodes => Set<QrCode>();
        public DbSet<QrClaim> QrClaims => Set<QrClaim>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<QrCode>().HasIndex(q => q.Code).IsUnique();
            builder.Entity<QrClaim>().HasIndex(c => new { c.UserId, c.QrCodeId }).IsUnique(); // 1 per user per code
        }
    }
}