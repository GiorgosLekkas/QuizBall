using MediatR;
using Persistence;

namespace Application.Core.Questions {
    public class Delete {
        public class Command : IRequest {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler (DataContext context) {
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Questions.FindAsync(request.Id);
                context.Remove(question);
                await context.SaveChangesAsync();
            }
        }
    }
}