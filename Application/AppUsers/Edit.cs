using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.AppUsers {
    public class Edit {
        public class Command : IRequest {
            public AppUser AppUsers { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper){
                this.context = context;
                this.mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var user = await context.Users.FindAsync(request.AppUsers.Id);

                mapper.Map(request.AppUsers, user);

                await context.SaveChangesAsync();
            }
        }
    }
}