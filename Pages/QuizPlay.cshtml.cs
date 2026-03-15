using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication1.Pages
{
    public class QuizPlayModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public string Id { get; set; } = "football-basics";

        public void OnGet()
        {
        }
    }
}