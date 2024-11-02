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
        public string Gender { get; set; }
        public int GamesPlayed { get; set; }
        public int Won { get; set; }
        public int Drawn { get; set; }
        public int Lost { get; set; }
        public int Plus { get; set; }
        public int Minus { get; set; }
        public int Plus_Minus { get; set; }
        public double Winrate { get; set; }
        public double TotalPoints { get; set; }
        public string Image { get; set; }
        public Photo Photo { get; set; }
    }
}