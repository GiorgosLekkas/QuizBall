using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Core.Questions {
    public class List {
        public class Query : IRequest<Result<List<Question_FieldDto>>> {

        }
        public class Handler : IRequestHandler<Query, Result<List<Question_FieldDto>>> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper) {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<Question_FieldDto>>> Handle(Query request, CancellationToken cancellationToken) {
                var questions = await context.Questions
                    //.Include(a => a.Authors)
                    //.ThenInclude(u => u.Account)
                    .ProjectTo<Question_FieldDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                //var questionsToReturn = mapper.Map<List<Question_FieldDto>>(questions);

                return Result<List<Question_FieldDto>>.Success(questions);
            }
        }
    }
}