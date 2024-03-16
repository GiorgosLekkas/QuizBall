using Application.Core.Questions;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class QuestionController : BaseApiController  {
        [HttpGet]
        public async Task<ActionResult<List<Question_Field>>> GetQuestions() {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question_Field>> GetQuestion(Guid id) {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestion(Question_Field question) {
            await Mediator.Send(new Create.Command{New_Question = question});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuestion(Guid id, Question_Field question) {
            question.Id = id;
            await Mediator.Send(new Edit.Command{Update_Question = question});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(Guid id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}