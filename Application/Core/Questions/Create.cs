using Domain;
using MediatR;
using Persistence;

namespace Application.Core.Questions {
    public class Create {
        public class Command : IRequest {
            public Question_Field New_Question { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                context.Questions.Add(request.New_Question);
                await context.SaveChangesAsync();
            }
        }
    }
}