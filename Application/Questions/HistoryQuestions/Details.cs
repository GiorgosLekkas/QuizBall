using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.HistoryQuestions {
    public class Details {
        public class Query : IRequest<HistoryQuestion> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, HistoryQuestion> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task<HistoryQuestion> Handle(Query request, CancellationToken cancellationToken) {
                return await context.History_Question.FindAsync(request.Id);
            }
        }
    }
}
