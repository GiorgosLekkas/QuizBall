
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles {
    public class Details {
        public class Query : IRequest<Result<Profile>> {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>> {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
                this.userAccessor = userAccessor;
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken) {
                var user = await context.Users
                    .ProjectTo<Profile>(mapper.ConfigurationProvider, new { currentUsername = userAccessor.GetUserName()})
                    .SingleOrDefaultAsync(x => x.UserName == request.UserName);

                if (user == null) return null;

                return Result<Profile>.Success(user);
            }
        }
    }
}