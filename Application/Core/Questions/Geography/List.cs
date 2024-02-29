using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Questions.Geography {
    public class List {
        public class Query : IRequest<List<QuestionGeography>> {

        }
        public class Handler : IRequestHandler<Query, List<QuestionGeography>> {
            private readonly DataContext context;
            public Handler(DataContext context) {
                this.context = context;
            }
            public async Task<List<QuestionGeography>> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Question_Geography.ToListAsync();
            }
        }
    }
}