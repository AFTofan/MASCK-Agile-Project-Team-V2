using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication1.Pages
{
    public class AchievementsModel : PageModel
    {
        public int TotalPoints { get; set; }
        public int UnlockedCount { get; set; }
        public List<AchievementItem> Achievements { get; set; } = new();

        public void OnGet()
        {
            // Replace this later with real user points from DB / claims / profile
            TotalPoints = 10;

            Achievements = new List<AchievementItem>
            {
                new AchievementItem
                {
                    Title = "First Points",
                    Description = "Earn your first 5 points.",
                    Hint = "Start playing any activity to earn points.",
                    Icon = "⭐",
                    Unlocked = TotalPoints >= 5
                },
                new AchievementItem
                {
                    Title = "Point Collector",
                    Description = "Reach 25 points in total.",
                    Hint = "Keep completing quizzes and games.",
                    Icon = "💰",
                    Unlocked = TotalPoints >= 25
                },
                new AchievementItem
                {
                    Title = "Fan Champion",
                    Description = "Reach 100 points total.",
                    Hint = "Complete lessons + quiz + puzzle + QR.",
                    Icon = "🏆",
                    Unlocked = TotalPoints >= 100
                },
                new AchievementItem
                {
                    Title = "Quiz Starter",
                    Description = "Complete your first quiz.",
                    Hint = "Open Quiz Games and finish one full quiz.",
                    Icon = "🎮",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Quiz Master",
                    Description = "Complete 3 different quizzes.",
                    Hint = "Try multiple quiz topics.",
                    Icon = "🧠",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Perfect Score",
                    Description = "Get 10/10 in a quiz.",
                    Hint = "Answer every question correctly.",
                    Icon = "💯",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Puzzle Starter",
                    Description = "Complete your first puzzle.",
                    Hint = "Solve any puzzle once.",
                    Icon = "🧩",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Puzzle Pro",
                    Description = "Complete all 3 puzzles.",
                    Hint = "Finish easy, medium and hard puzzles.",
                    Icon = "🖼️",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Memory Matcher",
                    Description = "Complete the memory match game.",
                    Hint = "Match all card pairs.",
                    Icon = "🃏",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Lesson Learner",
                    Description = "Complete 1 learning lesson.",
                    Hint = "Go to Learning Time and finish a lesson.",
                    Icon = "📚",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Study Streak",
                    Description = "Complete 3 lessons.",
                    Hint = "Keep learning to unlock more.",
                    Icon = "📝",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "QR Scanner",
                    Description = "Claim your first QR code.",
                    Hint = "Scan or submit a QR reward code.",
                    Icon = "📷",
                    Unlocked = true
                },
                new AchievementItem
                {
                    Title = "Card Creator",
                    Description = "Generate your first player card.",
                    Hint = "Upload a photo and make a custom card.",
                    Icon = "🪪",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Super Supporter",
                    Description = "Unlock 5 achievements.",
                    Hint = "Play more activities to unlock badges.",
                    Icon = "🔥",
                    Unlocked = false
                },
                new AchievementItem
                {
                    Title = "Hatters Hero",
                    Description = "Unlock 10 achievements.",
                    Hint = "Complete activities across the platform.",
                    Icon = "👑",
                    Unlocked = false
                }
            };

            UnlockedCount = Achievements.Count(a => a.Unlocked);
        }

        public class AchievementItem
        {
            public string Title { get; set; } = "";
            public string Description { get; set; } = "";
            public string Hint { get; set; } = "";
            public string Icon { get; set; } = "";
            public bool Unlocked { get; set; }
        }
    }
}