using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Questions.Geography;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers {
    [AllowAnonymous]
    public class Question_GeographyController : BaseApiController {
        [HttpGet]
        public async Task<ActionResult<List<QuestionGeography>>> GetQuestionGeography() {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionGeography>> GetQuestionGeography(Guid id) {
            await Mediator.Send(new Details.Query{Id = id});
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestionGeography(QuestionGeography geo_question) {
            await Mediator.Send(new Create.Command{Question_Geography = geo_question});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuestionGeography(Guid id, QuestionGeography geo_question) {
            geo_question.Id = id;
            await Mediator.Send(new Edit.Command{QuestionGeography = geo_question});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionGeography(Guid id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}