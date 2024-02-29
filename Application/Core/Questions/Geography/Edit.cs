using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.Geography {
    public class Edit {
        public class Command : IRequest {
            public QuestionGeography QuestionGeography { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper){
                this.context = context;
                this.mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var activity = await context.Question_Geography.FindAsync(request.QuestionGeography.Id);
                mapper.Map(request.QuestionGeography, activity);
                await context.SaveChangesAsync();
            }
        }
    }
}