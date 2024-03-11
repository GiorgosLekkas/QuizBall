using MediatR;
using Persistence;

namespace Application.Core.Accounts {
    public class Delete {
        public class Command : IRequest {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler (DataContext context) {
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var user = await context.Accounts.FindAsync(request.Id);
                context.Remove(user);
                await context.SaveChangesAsync();
            }
        }
    }
}