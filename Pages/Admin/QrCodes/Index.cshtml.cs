using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Pages.Admin.QrCodes
{
    [Authorize(Roles = "Admin")]
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _db;

        public IndexModel(ApplicationDbContext db) => _db = db;

        public List<QrCode> Codes { get; private set; } = [];

        [BindProperty]
        public string? CustomCode { get; set; }

        [BindProperty]
        public int PointsValue { get; set; } = 10;

        [BindProperty]
        public bool IsActive { get; set; } = true;

        public async Task OnGetAsync()
        {
            Codes = await _db.QrCodes
                .OrderByDescending(q => q.Id)
                .ToListAsync();
        }

        public async Task<IActionResult> OnPostCreateAsync()
        {
            var code = (CustomCode ?? "").Trim();

            if (string.IsNullOrWhiteSpace(code))
                code = GenerateCode(10); // random code length 10

            // Ensure unique
            var exists = await _db.QrCodes.AnyAsync(q => q.Code == code);
            if (exists)
            {
                ModelState.AddModelError("", "That code already exists. Try another or leave blank for random.");
                await OnGetAsync();
                return Page();
            }

            _db.QrCodes.Add(new QrCode
            {
                Code = code,
                PointsValue = PointsValue <= 0 ? 10 : PointsValue,
                IsActive = IsActive
            });

            await _db.SaveChangesAsync();
            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostToggleAsync(int id)
        {
            var qr = await _db.QrCodes.FirstOrDefaultAsync(q => q.Id == id);
            if (qr == null) return RedirectToPage();

            qr.IsActive = !qr.IsActive;
            await _db.SaveChangesAsync();

            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            var qr = await _db.QrCodes.FirstOrDefaultAsync(q => q.Id == id);
            if (qr == null) return RedirectToPage();

            // Optional safety: if any claims exist, you can prevent delete.
            var hasClaims = await _db.QrClaims.AnyAsync(c => c.QrCodeId == id);
            if (hasClaims)
            {
                ModelState.AddModelError("", "Cannot delete: this QR code has already been claimed.");
                await OnGetAsync();
                return Page();
            }

            _db.QrCodes.Remove(qr);
            await _db.SaveChangesAsync();

            return RedirectToPage();
        }

        private static string GenerateCode(int length)
        {
            const string alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing 0/O/1/I
            var bytes = RandomNumberGenerator.GetBytes(length);
            var chars = new char[length];

            for (int i = 0; i < length; i++)
                chars[i] = alphabet[bytes[i] % alphabet.Length];

            return new string(chars);
        }
    }
}