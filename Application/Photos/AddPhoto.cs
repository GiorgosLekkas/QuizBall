using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos {
    public class AddPhoto {
        public class Command : IRequest<Result<Photo>> {
            public IFormFile File { get; set; }
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>> {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor) {
                this.context = context;
                this.photoAccessor = photoAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken) {
                if (request.File == null) {
                    throw new ArgumentNullException(nameof(File), "File is null");
                }
                var photoUploadResult = await photoAccessor.AddPhoto(request.File);
                var question = await context.Questions.FindAsync(Guid.Parse(request.Id));

                var photo = new Photo {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (photo == null)
                    return Result<Photo>.Failure("Problem adding photo");

                if (question == null)
                    return Result<Photo>.Failure("Problem adding Question");

                question.Photo = photo;

                var result = await context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}