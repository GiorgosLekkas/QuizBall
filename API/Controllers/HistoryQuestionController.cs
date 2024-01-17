using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers {
    public class HistoryQuestionController : BaseApiController {
        private readonly DataContext context;
        public HistoryQuestionController (DataContext context) {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<HistoryQuestion>>> GetHistoryQuestions() {
            return await context.History_Question.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HistoryQuestion>> GetHistoryQuestion(Guid id) {
            return await context.History_Question.FindAsync(id);
        }
    }
}