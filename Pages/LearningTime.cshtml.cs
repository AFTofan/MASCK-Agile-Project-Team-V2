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
    public class LearningTimeModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public LearningTimeModel(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public string? Message { get; set; }

        public class LessonCard
        {
            public string Key { get; set; } = "";
            public string Title { get; set; } = "";
            public string Description { get; set; } = "";
            public int Points { get; set; }
            public bool IsCompleted { get; set; }
        }

        public List<LessonCard> Lessons { get; set; } = new();

        private static readonly List<LessonCard> LessonSeed = new()
        {
            new() { Key="basics", Title="Football Basics", Description="Rules, positions, and how a match flows.", Points=10 },
            new() { Key="stadium", Title="Kenilworth Road", Description="Stadium history + iconic facts.", Points=15 },
            new() { Key="players", Title="Famous Players", Description="Key names and moments in LTFC history.", Points=10 },
        };

        public async Task OnGetAsync()
        {
            await LoadAsync();
        }

        public async Task<IActionResult> OnPostAsync(string lessonKey)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Challenge();

            var lesson = LessonSeed.FirstOrDefault(l => l.Key == lessonKey);
            if (lesson == null)
            {
                await LoadAsync();
                return Page();
            }

            var already = await _db.LessonCompletions
                .AnyAsync(x => x.UserId == user.Id && x.LessonKey == lessonKey);

            if (already)
            {
                Message = "You already completed this lesson.";
                await LoadAsync();
                return Page();
            }

            _db.LessonCompletions.Add(new LessonCompletion
            {
                UserId = user.Id,
                LessonKey = lessonKey,
                PointsAwarded = lesson.Points,
                CompletedAtUtc = DateTime.UtcNow
            });

            user.Points += lesson.Points;
            await _userManager.UpdateAsync(user);

            await _db.SaveChangesAsync();

            Message = $"Nice! You earned +{lesson.Points} points for completing “{lesson.Title}”.";
            await LoadAsync();
            return Page();
        }

        private async Task LoadAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                Lessons = LessonSeed;
                return;
            }

            var completedKeys = await _db.LessonCompletions
                .Where(x => x.UserId == user.Id)
                .Select(x => x.LessonKey)
                .ToListAsync();

            Lessons = LessonSeed
                .Select(l => new LessonCard
                {
                    Key = l.Key,
                    Title = l.Title,
                    Description = l.Description,
                    Points = l.Points,
                    IsCompleted = completedKeys.Contains(l.Key)
                })
                .ToList();
        }
    }
}