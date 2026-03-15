using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class QrCode
    {
        public int Id { get; set; }

        [Required]
        public string Code { get; set; } = "";

        public int PointsValue { get; set; }

        public bool IsActive { get; set; } = true;

        [StringLength(100)]
        public string? Title { get; set; }

        [StringLength(300)]
        public string? RedirectUrl { get; set; }
    }
}