using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Questions.Geography {
    public class Delete {
        public class Command : IRequest {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            public Handler (DataContext context) {
                this.context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Question_Geography.FindAsync(request.Id);
                context.Remove(question);
                await context.SaveChangesAsync();
            }
        }
    }
}