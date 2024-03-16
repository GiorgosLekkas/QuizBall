using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Questions {
    public class List {
        public class Query : IRequest<List<Question_Field>> {

        }
        public class Handler : IRequestHandler<Query, List<Question_Field>> {
            private readonly DataContext context;
            public Handler(DataContext context) {
                this.context = context;
            }
            public async Task<List<Question_Field>> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Questions.ToListAsync();
            }
        }
    }
}