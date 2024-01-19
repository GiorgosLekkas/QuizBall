using System.Data;
using System.Runtime.InteropServices;
using Domain;
using MediatR;
using Persistence;

namespace Application.AppUsers {
    public class Details {
        public class Query : IRequest<AppUser> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppUser> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Users.FindAsync(request.Id);
            }
        }
    }
}