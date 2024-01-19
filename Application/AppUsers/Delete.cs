using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.AppUsers {
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
                var user = await context.Users.FindAsync(request.Id);
                context.Remove(user);
                await context.SaveChangesAsync();
            }
        }
    }
}