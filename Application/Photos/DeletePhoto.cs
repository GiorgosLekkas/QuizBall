using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos{
    public class DeletePhoto{
        public class Command : IRequest<Result<Unit>> {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            public Handler (DataContext context, IPhotoAccessor photoAccessor) {
                this.context = context;
                this.photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var question = await context.Questions.Include(q => q.Photo).FirstOrDefaultAsync(q => q.Id == request.Id);

                if (question == null) return Result<Unit>.Failure("Problem finding question");

                var photo = question.Photo;

                if (photo == null) return Result<Unit>.Failure("Problem finding photo");

                var result = await photoAccessor.DeletePhoto(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo 1");
                
                question.Photo = null;
                context.Remove(photo);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo 2");
            }
        }
    }
}