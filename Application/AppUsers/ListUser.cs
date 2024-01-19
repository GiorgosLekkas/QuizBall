using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppUsers {
    public class ListUser {
        public class Query : IRequest<List<AppUser>> {

        }
        public class Handler : IRequestHandler<Query, List<AppUser>> {
            private readonly DataContext context;
            public Handler(DataContext context) {
                this.context = context;
            }
            public async Task<List<AppUser>> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Users.ToListAsync();
            }
        }
    }
}