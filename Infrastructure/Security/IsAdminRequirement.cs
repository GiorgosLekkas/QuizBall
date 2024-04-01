using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security {
    public class IsAdminRequirement : IAuthorizationRequirement {
        
    }

    public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement> {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsAdminRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor) {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement) {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = dbContext.Accounts
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == userId && x.Id == activityId.ToString())
                .Result;

            if (attendee == null) return Task.CompletedTask;

            // if (attendee.IsAuthor) context.Succeed(requirement);

            return Task.CompletedTask;
        }
        
    }
}