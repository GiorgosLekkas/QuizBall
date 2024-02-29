using Application.Questions.HistoryQuestions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    [AllowAnonymous]
    public class HistoryQuestionController : BaseApiController {
        [HttpGet]
        public async Task<ActionResult<List<HistoryQuestion>>> GetHistoryQuestions() {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HistoryQuestion>> GetHistoryQuestion(Guid id) {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateHistoryQuestion(HistoryQuestion hist_question) {
            await Mediator.Send(new Create.Command{HistoryQuestion = hist_question});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditHistoryQuestion(Guid id, HistoryQuestion hist_question) {
            hist_question.Id = id;
            await Mediator.Send(new Edit.Command{HistoryQuestion = hist_question});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(Guid id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}