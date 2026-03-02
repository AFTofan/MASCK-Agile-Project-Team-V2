namespace WebApplication1.Models
{
    public class QrClaim
    {
        public int Id { get; set; }

        public int QrCodeId { get; set; }
        public QrCode QrCode { get; set; } = default!;

        public string UserId { get; set; } = "";
        public ApplicationUser User { get; set; } = default!;

        public DateTime ClaimedAtUtc { get; set; } = DateTime.UtcNow;
    }
}