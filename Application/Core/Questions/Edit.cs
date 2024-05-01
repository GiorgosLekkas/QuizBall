using System.Security.Claims;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Core.Questions {

    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public Question_Field Update_Question { get; set; }
            public Account Author { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext context;
            private readonly UserManager<Account> userManager;
            private readonly IMapper mapper;

            public Handler(DataContext context,UserManager<Account> userManager, IMapper mapper) {
                this.context = context;
                this.userManager = userManager;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Questions.FindAsync(request.Update_Question.Id);
                
                var author = new QuestionAuthor {
                    AccountId = request.Author.Id,
                    Account = request.Author,
                    Question = request.Update_Question,
                    QuestionId = request.Update_Question.Id,
                    IsAuthor = true
                };

                request.Update_Question.Author = request.Author;

                context.Questions.Remove(question);
                var result = await context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Question");

                context.Questions.Add(request.Update_Question);
                result = await context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create Question");

                return Result<Unit>.Success(Unit.Value);

                /*var quesion = await context.Questions.FindAsync(request.Update_Question.Id);

                if (quesion == null) return null;

                mapper.Map(request.Update_Question, quesion);

                var result = await  context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update activity");

                return Result<Unit>.Success(Unit.Value);*/
            }
        }
    }
}