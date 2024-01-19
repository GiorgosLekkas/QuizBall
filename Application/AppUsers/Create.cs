using Domain;
using MediatR;
using Persistence;

namespace Application.AppUsers {
    public class Create {
        public class Command : IRequest {
            public AppUser AppUsers { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                context.Users.Add(request.AppUsers);
                await context.SaveChangesAsync();
            }
        }
    }
}