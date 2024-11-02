using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class RegisterDto {

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string Gender { get; set; }
        /*public int GamesPlayed { get; set; }
        public int Won { get; set; }
        public int Drawn { get; set; }
        public int Lost { get; set; }
        public int Plus { get; set; }
        public int Minus { get; set; }
        public int Plus_Minus { get; set; }*/
    }
}