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

        public async Task<IActionResult> OnGetAsync()
        {
            if (string.IsNullOrWhiteSpace(Code))
            {
                TempData["QrPopupMessage"] = "Invalid QR code.";
                TempData["QrPopupType"] = "error";
                return Redirect("/PlayGames");
            }

            var qr = await _db.QrCodes.FirstOrDefaultAsync(q => q.Code == Code && q.IsActive);
            if (qr == null)
            {
                TempData["QrPopupMessage"] = "This QR code is not valid.";
                TempData["QrPopupType"] = "error";
                return Redirect("/PlayGames");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var alreadyClaimed = await _db.QrClaims.AnyAsync(c => c.UserId == user.Id && c.QrCodeId == qr.Id);
            if (alreadyClaimed)
            {
                TempData["QrPopupMessage"] = $"You already claimed \"{(string.IsNullOrWhiteSpace(qr.Title) ? qr.Code : qr.Title)}\".";
                TempData["QrPopupType"] = "info";
                return Redirect(string.IsNullOrWhiteSpace(qr.RedirectUrl) ? "/PlayGames" : qr.RedirectUrl);
            }

            user.Points += qr.PointsValue;

            _db.QrClaims.Add(new QrClaim
            {
                UserId = user.Id,
                QrCodeId = qr.Id
            });

            await _userManager.UpdateAsync(user);
            await _db.SaveChangesAsync();

            TempData["QrPopupMessage"] = $"+{qr.PointsValue} points added to your account!";
            TempData["QrPopupType"] = "success";

            if (string.IsNullOrWhiteSpace(qr.RedirectUrl))
            {
                return Redirect("/PlayGames");
            }

            return Redirect(qr.RedirectUrl);
        }
    }
}