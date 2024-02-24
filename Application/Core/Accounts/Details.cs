using Domain;
using MediatR;
using Persistence;

namespace Application.Core.Accounts {
    public class Details {
        public class Query : IRequest<Account> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Account> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task<Account> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Accounts.FindAsync(request.Id);
            }
        }
    }
}
