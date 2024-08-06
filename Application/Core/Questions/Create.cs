using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Questions {
    public class Create {
        public class Command : IRequest<Result<Unit>> {
            public Question_Field New_Question { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor){
                this.context = context;
                this.userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var user = await context.Accounts.FirstOrDefaultAsync( x => 
                    x.UserName == userAccessor.GetUserName()
                );


                var author = new QuestionAuthor {
                    AccountId = user.Id,
                    Account = user,
                    Question = request.New_Question,
                    QuestionId = request.New_Question.Id,
                    IsAuthor = true
                };
                request.New_Question.Author = user;

                context.Questions.Add(request.New_Question);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Question");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}