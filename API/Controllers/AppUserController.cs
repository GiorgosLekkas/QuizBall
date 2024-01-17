using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers {
    public class AppUserController : BaseApiController {
        private readonly DataContext context;
        public AppUserController (DataContext context) {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetAppUsers() {
            return await context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetAppUser(Guid id) {
            return await context.Users.FindAsync(id);
        }
    }
}