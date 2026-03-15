using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Your points field (if you already have it, keep it)
        public int Points { get; set; } = 0;

        [StringLength(24)]
        public string? Nickname { get; set; }

        // store DOB (better than storing "Age" because age changes)
        public DateTime? DateOfBirth { get; set; }

        public bool ParentalConsent { get; set; } = false;

        // example: "/avatars/abc123.png"
        [StringLength(255)]
        public string? AvatarPath { get; set; }
    }
}