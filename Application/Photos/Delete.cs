using System.Security.Cryptography.X509Certificates;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos {
    public class Delete {
        public class Command : IRequest<Result<Unit>> {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            public Handler (DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var user = await context.Users.Include(p => p.Photo)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var photo = user.Photo;

                string photoId = photo.Id;

                if (photo == null) return null;

                var result = await photoAccessor.DeletePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo");

                user.Photo = null;

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo");
            }
        }
    }
}