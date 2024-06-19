using System.Security.Claims;
using API.DTOs;
using API.Services;
using Application.Core.Accounts;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController: BaseApiController {
        private readonly UserManager<Account> userManager;
        private readonly TokenService tokenService;
        public AccountController(UserManager<Account> userManager, TokenService tokenService){
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await userManager.Users.Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result) 
                return CreateUserObject(user);

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            
            if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email)){
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await userManager.Users.AnyAsync(x => x.NormalizedUserName == userManager.NormalizeName(registerDto.UserName))){
                ModelState.AddModelError("userName", "Username taken");
                return ValidationProblem();
            }

            var user = new Account {
                UserName = registerDto.UserName,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Role = registerDto.Role,
                Gender = registerDto.Gender,
                /*GamesPlayed = registerDto.GamesPlayed,
                Won = registerDto.Won,
                Drawn = registerDto.Drawn,
                Lost = registerDto.Lost,
                Plus = registerDto.Plus,
                Minus = registerDto.Minus,
                Plus_Minus = registerDto.Plus - registerDto.Minus,*/
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
                return CreateUserObject(user);

            return BadRequest(result.Errors);

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser() {
            var user = await userManager.Users
                .Include(p => p.Photo)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<List<Account>>> GetAllAccounts() {
            return await Mediator.Send(new List.Query());
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditAccount(string id, Account account) {
            var user = await userManager.FindByIdAsync(id);
            user.Email = account.Email;
            user.UserName = account.UserName;
            user.FirstName = user.FirstName;
            user.LastName = account.LastName;
            user.Gender = account.Gender;
            user.Role = account.Role;
            user.GamesPlayed = account.GamesPlayed;
            user.Won = account.Won;
            user.Drawn = account.Drawn;
            user.Lost = account.Lost;
            user.Plus = account.Plus;
            user.Minus = account.Minus;
            user.Plus_Minus = account.Plus_Minus;
            user.Winrate = account.Winrate;
            user.TotalPoints = account.TotalPoints;
            var result = await userManager.UpdateAsync(user);
            if(result.Succeeded)
                return Ok();
            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id) {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }

        private UserDto CreateUserObject(Account user) {

            UserDto account =  new UserDto {
                Id = user.Id,
                UserName = user.UserName,
                Role = user.Role,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Gender = user.Gender,
                GamesPlayed = user.GamesPlayed,
                Won = user.Won,
                Drawn = user.Drawn,
                Lost = user.Lost,
                Plus = user.Plus,
                Minus = user.Minus,
                Plus_Minus = user.Plus - user.Minus,
                Winrate = user.Winrate,
                TotalPoints = user.TotalPoints,
                Token = tokenService.CreateToken(user),
            };

            if(user.Photo == null)
                account.Image = null;
            else
                account.Image = user.Photo.Url;
            
            return account;
        }
    }
}