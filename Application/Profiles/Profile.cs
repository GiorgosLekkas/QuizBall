using Application.Core.Questions;
using Domain;

namespace Application.Profiles {
    public class Profile {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public string Image { get; set; }
        public Photo Photo { get; set; }
        public ICollection<Question_Field> Questions { get; set; } = new List<Question_Field>();
    }
}