namespace WebApplication1.Models
{
    public class QrCode
    {
        public int Id { get; set; }
        public string Code { get; set; } = "";
        public int PointsValue { get; set; } = 10;
        public bool IsActive { get; set; } = true;
    }
}