using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Pages
{
    [Authorize]
    public class ProfileModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileModel(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public ApplicationUser? CurrentUser { get; private set; }
        public List<QrClaimRow> Claims { get; private set; } = [];

        public class QrClaimRow
        {
            public string Code { get; set; } = "";
            public int Points { get; set; }
            public DateTime ClaimedAtUtc { get; set; }
        }

        public async Task OnGetAsync()
        {
            CurrentUser = await _userManager.GetUserAsync(User);

            var userId = _userManager.GetUserId(User);

            Claims = await _db.QrClaims
                .Where(c => c.UserId == userId)
                .OrderByDescending(c => c.ClaimedAtUtc)
                .Select(c => new QrClaimRow
                {
                    Code = c.QrCode.Code,
                    Points = c.QrCode.PointsValue,
                    ClaimedAtUtc = c.ClaimedAtUtc
                })
                .ToListAsync();
        }
    }
}