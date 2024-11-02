using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Core.Accounts {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public string Id { get; set; }
            public Account Updated_Account { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext context;
            private readonly UserManager<Account> userManager;
            private readonly IMapper mapper;

            private readonly ILogger<Handler> logger;

            public Handler(DataContext context,UserManager<Account> userManager, IMapper mapper, ILogger<Handler> logger) {
                this.context = context;
                this.userManager = userManager;
                this.mapper = mapper;
                this.logger = logger;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var user = await context.Accounts.FirstOrDefaultAsync(a => a.Id == request.Id);
                
                user.Email = request.Updated_Account.Email;
                user.UserName = request.Updated_Account.UserName;
                user.FirstName = request.Updated_Account.FirstName;
                user.LastName = request.Updated_Account.LastName;
                user.Gender = request.Updated_Account.Gender;
                user.Role = request.Updated_Account.Role;
                user.GamesPlayed = request.Updated_Account.GamesPlayed;
                user.Won = request.Updated_Account.Won;
                user.Drawn = request.Updated_Account.Drawn;
                user.Lost = request.Updated_Account.Lost;
                user.Plus = request.Updated_Account.Plus;
                user.Minus = request.Updated_Account.Minus;
                user.Plus_Minus = request.Updated_Account.Plus_Minus;
                user.Winrate = request.Updated_Account.Winrate;
                user.TotalPoints = request.Updated_Account.TotalPoints;
                //if(request.Updated_Account.Photo != null)
                    //user.Photo = request.Updated_Account.Photo;
                //var result = await context.SaveChangesAsync() > 0;
                var result = await context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update Question");

                return Result<Unit>.Success(Unit.Value); ;
                
            }
        }
    }
}