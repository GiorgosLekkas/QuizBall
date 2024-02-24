using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Questions.HistoryQuestions {
    public class List {
        public class Query : IRequest<List<HistoryQuestion>> {

        }
        public class Handler : IRequestHandler<Query, List<HistoryQuestion>> {
            private readonly DataContext context;
            public Handler(DataContext context) {
                this.context = context;
            }
            public async Task<List<HistoryQuestion>> Handle(Query request, CancellationToken cancellationToken) {
                return await context.History_Question.ToListAsync();
            }
        }
    }
}