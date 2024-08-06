using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class PhotosController : BaseApiController{
        public async Task<IActionResult> Add([FromForm] Add.Command command){
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut("addphoto/{id}")]
        public async Task<IActionResult> PhotoAdd([FromForm] IFormFile file, [FromForm] string id) {
            var command = new AddPhoto.Command { File = file, Id = id };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("deletephoto/{id}")]
        public async Task<IActionResult> PhotoDelete(Guid id) {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}