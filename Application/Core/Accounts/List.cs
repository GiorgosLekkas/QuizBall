using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Accounts {
    public class List {
        public class Query : IRequest<List<Account>> { }

        public class Handler : IRequestHandler<Query, List<Account>> {
            private readonly DataContext context;

            public Handler(DataContext context) {
                this.context = context;
            }

            public async Task<List<Account>> Handle(Query request, CancellationToken token) {
                return await context.Accounts.Include(p => p.Photo).ToListAsync();
            }
        }
    }
}