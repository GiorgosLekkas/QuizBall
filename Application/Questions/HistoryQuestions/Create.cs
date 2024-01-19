using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.HistoryQuestions {
    public class Create {
        public class Command : IRequest {
            public HistoryQuestion HistoryQuestion { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                context.History_Question.Add(request.HistoryQuestion);
                await context.SaveChangesAsync();
            }
        }
    }
}