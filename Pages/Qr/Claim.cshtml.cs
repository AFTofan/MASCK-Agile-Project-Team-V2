using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Pages.Qr
{
    [Authorize]
    public class ClaimModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ClaimModel(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [BindProperty(SupportsGet = true)]
        public string? Code { get; set; }

        public string Message { get; private set; } = "";

        public async Task<IActionResult> OnGetAsync()
        {
            if (string.IsNullOrWhiteSpace(Code))
            {
                Message = "Invalid QR code.";
                return Page();
            }

            var qr = await _db.QrCodes.FirstOrDefaultAsync(q => q.Code == Code && q.IsActive);
            if (qr == null)
            {
                Message = "This QR code is not valid.";
                return Page();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var alreadyClaimed = await _db.QrClaims.AnyAsync(c => c.UserId == user.Id && c.QrCodeId == qr.Id);
            if (alreadyClaimed)
            {
                Message = "You already claimed this QR code.";
                return Page();
            }

            user.Points += qr.PointsValue;

            _db.QrClaims.Add(new QrClaim { UserId = user.Id, QrCodeId = qr.Id });

            await _userManager.UpdateAsync(user);
            await _db.SaveChangesAsync();

            Message = $"Success! +{qr.PointsValue} points. Total: {user.Points}";
            return Page();
        }
    }
}