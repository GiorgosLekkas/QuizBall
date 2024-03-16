using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Core.Questions {
    public class Edit {
        public class Command : IRequest {
            public Question_Field Update_Question { get; set; }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper){
                this.context = context;
                this.mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Questions.FindAsync(request.Update_Question.Id);

                mapper.Map(request.Update_Question, question);

                await context.SaveChangesAsync();
            }
        }
    }
}