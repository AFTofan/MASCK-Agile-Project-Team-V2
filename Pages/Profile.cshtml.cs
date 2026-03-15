using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IWebHostEnvironment _env;

        public ProfileModel(ApplicationDbContext db, UserManager<ApplicationUser> userManager, IWebHostEnvironment env)
        {
            _db = db;
            _userManager = userManager;
            _env = env;
        }

        public ApplicationUser? CurrentUser { get; private set; }
        public List<QrClaimRow> Claims { get; private set; } = [];

        public bool RequiresParentalConsent { get; private set; }
        public string DisplayName { get; private set; } = "";
        public string? AvatarUrl { get; private set; }
        public string? StatusMessage { get; private set; }

        [BindProperty]
        public InputModel Input { get; set; } = new();

        public class InputModel
        {
            public string? Nickname { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public bool ParentalConsent { get; set; }
            public IFormFile? AvatarFile { get; set; }
        }

        public class QrClaimRow
        {
            public string Code { get; set; } = "";
            public int Points { get; set; }
            public DateTime ClaimedAtUtc { get; set; }
        }

        public async Task OnGetAsync()
        {
            await LoadAsync();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            CurrentUser = await _userManager.GetUserAsync(User);
            if (CurrentUser == null) return RedirectToPage("/Index");

            var under18 = IsUnder18(Input.DateOfBirth);

            // If under 18 => must tick consent
            if (under18 && !Input.ParentalConsent)
                ModelState.AddModelError("Input.ParentalConsent", "Parental/guardian consent is required if you are under 18.");

            // Validate avatar file (optional)
            if (Input.AvatarFile != null && Input.AvatarFile.Length > 0)
            {
                var allowed = new[] { "image/jpeg", "image/png", "image/webp" };
                if (!allowed.Contains(Input.AvatarFile.ContentType))
                    ModelState.AddModelError("Input.AvatarFile", "Please upload a JPG/PNG/WEBP image.");

                if (Input.AvatarFile.Length > 2_000_000)
                    ModelState.AddModelError("Input.AvatarFile", "Avatar must be under 2MB.");
            }

            if (!ModelState.IsValid)
            {
                // reload claims + top data
                await LoadAsync();
                RequiresParentalConsent = under18;
                return Page();
            }

            // Save fields
            CurrentUser.Nickname = string.IsNullOrWhiteSpace(Input.Nickname) ? null : Input.Nickname.Trim();
            CurrentUser.DateOfBirth = Input.DateOfBirth;
            CurrentUser.ParentalConsent = under18 ? Input.ParentalConsent : false;

            // Avatar upload
            if (Input.AvatarFile != null && Input.AvatarFile.Length > 0)
            {
                var avatarsDir = Path.Combine(_env.WebRootPath, "avatars");
                Directory.CreateDirectory(avatarsDir);

                var ext = Path.GetExtension(Input.AvatarFile.FileName).ToLowerInvariant();
                var fileName = $"{Guid.NewGuid():N}{ext}";
                var fullPath = Path.Combine(avatarsDir, fileName);

                using (var stream = System.IO.File.Create(fullPath))
                {
                    await Input.AvatarFile.CopyToAsync(stream);
                }

                CurrentUser.AvatarPath = $"/avatars/{fileName}";
            }

            await _userManager.UpdateAsync(CurrentUser);

            StatusMessage = "Profile updated!";
            await LoadAsync();
            return Page();
        }

        private async Task LoadAsync()
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

            if (CurrentUser != null)
            {
                DisplayName = string.IsNullOrWhiteSpace(CurrentUser.Nickname)
                    ? (CurrentUser.Email ?? User.Identity?.Name ?? "User")
                    : CurrentUser.Nickname;

                AvatarUrl = CurrentUser.AvatarPath;

                RequiresParentalConsent = IsUnder18(CurrentUser.DateOfBirth);

                Input = new InputModel
                {
                    Nickname = CurrentUser.Nickname,
                    DateOfBirth = CurrentUser.DateOfBirth,
                    ParentalConsent = CurrentUser.ParentalConsent
                };
            }
        }

        private static bool IsUnder18(DateTime? dob)
        {
            if (dob == null) return false;

            var today = DateTime.UtcNow.Date;
            var age = today.Year - dob.Value.Year;
            if (dob.Value.Date > today.AddYears(-age)) age--;
            return age < 18;
        }
    }
}