using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class LessonCompletion
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = "";

        [Required]
        public string LessonKey { get; set; } = "";

        public int PointsAwarded { get; set; }
        public DateTime CompletedAtUtc { get; set; } = DateTime.UtcNow;
    }
}