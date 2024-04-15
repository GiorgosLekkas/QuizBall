using Domain;

namespace API.DTOs {
    public class UserDto {
        public string Token { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public string Password { get; set; }
        public string Gender { get; set; }
        public string Image { get; set; }
        public Photo Photo { get; set; }
    }
}