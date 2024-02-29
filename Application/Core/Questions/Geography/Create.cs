using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.Geography {
    public class Create {
        public class Command : IRequest {
            public QuestionGeography Question_Geography { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                context.Question_Geography.Add(request.Question_Geography);
                await context.SaveChangesAsync();
            }
        }
    }
}