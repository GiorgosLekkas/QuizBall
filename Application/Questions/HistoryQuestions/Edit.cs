using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.HistoryQuestions {
    public class Edit {
        public class Command : IRequest {
            public HistoryQuestion HistoryQuestion { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper){
                this.context = context;
                this.mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.History_Question.FindAsync(request.HistoryQuestion.Id);

                mapper.Map(request.HistoryQuestion, question);

                await context.SaveChangesAsync();
            }
        }
    }
}