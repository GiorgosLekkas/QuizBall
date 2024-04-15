using System.Security.Claims;
using Application.Core.Questions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    [AllowAnonymous]
    public class QuestionController : BaseApiController  {
        private readonly UserManager<Account> userManager;
        public QuestionController(UserManager<Account> userManager){
            this.userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult> GetQuestions() {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question_Field>> GetQuestion(Guid id) {
            var result =  await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuestion(Question_Field question) {
            await Mediator.Send(new Create.Command{New_Question = question});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuestion(Guid id, Question_Field question) {
            question.Id = id;
            var user = await userManager.Users.FirstOrDefaultAsync(X => X.UserName == question.AuthorName);
            await Mediator.Send(new Edit.Command{Update_Question = question, Author = user});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}