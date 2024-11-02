using System.Security.Claims;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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

            private readonly ILogger<Handler> logger;

            public Handler(DataContext context,UserManager<Account> userManager, IMapper mapper, ILogger<Handler> logger) {
                this.context = context;
                this.userManager = userManager;
                this.mapper = mapper;
                this.logger = logger;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Questions.Include(q => q.Author).FirstOrDefaultAsync(q => q.Id == request.Update_Question.Id);
                if (question == null) return Result<Unit>.Failure("Question not found");

                if( question.Category == "Find Player By Photo" || question.Category == "Find The Stadium" ||
                    question.Category == "Logo Quiz" || question.Category == "Guess The Player" ||
                    question.Category == "Guess The Score" || question.Category == "Manager id" ||
                    question.Category == "Player id" || question.Category == "Who Is Missing" ) {
                    question = await context.Questions.Include(q => q.Photo ).Include(q => q.Author).FirstOrDefaultAsync(q => q.Id == request.Update_Question.Id);
                    question.Photo = await context.Photos.FirstOrDefaultAsync(q => q.Id == request.Update_Question.Photo.Id);
                } else {
                    question = await context.Questions.Include(q => q.Author).FirstOrDefaultAsync(q => q.Id == request.Update_Question.Id);
                }

                if (question == null) return Result<Unit>.Failure("Question not found");

                Console.WriteLine("Original Question: " + question.Question);
                question.Question = request.Update_Question.Question;
                question.Answer1 = request.Update_Question.Answer1;
                question.Answer2 = request.Update_Question.Answer2;
                question.CorrectAnswer1 = request.Update_Question.CorrectAnswer1;
                question.CorrectAnswer2 = request.Update_Question.CorrectAnswer2;
                question.CorrectAnswer3 = request.Update_Question.CorrectAnswer3;
                question.CorrectAnswer4 = request.Update_Question.CorrectAnswer4;
                question.CorrectAnswer5 = request.Update_Question.CorrectAnswer5;
                question.Level = request.Update_Question.Level;
                question.Category = request.Update_Question.Category;
                question.Confirmed = request.Update_Question.Confirmed;
                //mapper.Map(request.Update_Question, question);
                Console.WriteLine("Mapped Question: " + question.Question);

                var result = await context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update Question");

                return Result<Unit>.Success(Unit.Value); ;
                
            }
        }
    }
}