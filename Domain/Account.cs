using Microsoft.AspNetCore.Identity;

namespace Domain {
    public class Account : IdentityUser {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public int GamesPlayed { get; set; } = 0;
        public int Won { get; set; } = 0;
        public int Drawn { get; set; } = 0;
        public int Lost { get; set; } = 0;
        public int Plus { get; set; } = 0;
        public int Minus { get; set; } = 0;
        public int Plus_Minus { get; set; } = 0;
        public double Winrate { get; set; } = 0;
        public double TotalPoints { get; set; } = 0;
        public ICollection<Question_Field> Questions { get; set; }
        public Photo Photo { get; set; }
    }
}