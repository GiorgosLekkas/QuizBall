namespace API.DTOs {
    public class LoginDto {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}