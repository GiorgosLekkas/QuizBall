using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.Core.Questions.Details;

namespace Application.Core.Questions {
    public class Details {
        
        public class Query : IRequest<Result<Question_FieldDto>>{
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<Query, Result<Question_FieldDto>> {
        public readonly DataContext context;
        private readonly IMapper mapper;
        public Handler(DataContext context, IMapper mapper) {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<Result<Question_FieldDto>> Handle(Query request, CancellationToken cancellationToken) {
            var activity = await context.Questions
                .ProjectTo<Question_FieldDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return Result<Question_FieldDto>.Success(activity);
        }
    }
}