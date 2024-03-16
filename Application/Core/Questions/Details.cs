using Domain;
using MediatR;
using Persistence;

namespace Application.Core.Questions {
    public class Details {
        public class Query : IRequest<Question_Field> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Question_Field> {
            private readonly DataContext context;
            public Handler(DataContext context){
                this.context = context;
            }
            public async Task<Question_Field> Handle(Query request, CancellationToken cancellationToken) {
                return await context.Questions.FindAsync(request.Id);
            }
        }
    }
}