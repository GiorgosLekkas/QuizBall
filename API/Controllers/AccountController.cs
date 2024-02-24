using System.Security.Claims;
using API.DTOs;
using API.Services;
using Application.Core.Accounts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result) {
                return new UserDto { 
                    UserName = user.UserName, 
                    Token = tokenService.CreateToken(user),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Password = user.Password,
                    Role = user.Role,
                    Gender = user.Gender
                };
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            
            if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email)){
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await userManager.Users.AnyAsync(x => x.NormalizedUserName == userManager.NormalizeName(registerDto.Username))){
                ModelState.AddModelError("userName", "Username taken");
                return ValidationProblem();
            }

            var user = new Account {
                UserName = registerDto.Username,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Password = registerDto.Password,
                Role = registerDto.Role,
                Gender = registerDto.Gender
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
                return CreateUserObject(user);

            return BadRequest(result.Errors);

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser() {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<List<Account>>> GetAllAccounts() {
            return await Mediator.Send(new List.Query());
        }

        private UserDto CreateUserObject(Account user) {
            return new UserDto {
                Token = tokenService.CreateToken(user),
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                Gender = user.Gender
            };
        }

    }
}