using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos {
    public class Add {
        public class Command : IRequest<Result<Photo>> {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>> {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor) {
                this.userAccessor = userAccessor;
                this.context = context;
                this.photoAccessor = photoAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken) {
                var photoUploadResult = await photoAccessor.AddPhoto(request.File);
                var user = await context.Accounts.Include(p => p.Photo)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var photo = new Photo {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                user.Photo = photo;

                var result = await context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}