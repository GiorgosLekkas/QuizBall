using Application.AppUsers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers {
    public class AppUserController : BaseApiController {
        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetAppusers() {
            return await Mediator.Send(new ListUser.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetAppUser(Guid id) {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppUser(AppUser appuser) {
            await Mediator.Send(new Create.Command{AppUsers = appuser});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAppUser(Guid id, AppUser appuser) {
            appuser.Id = id;
            await Mediator.Send(new Edit.Command{AppUsers = appuser});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(Guid id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}