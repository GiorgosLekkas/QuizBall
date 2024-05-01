using Microsoft.AspNetCore.Identity;

namespace Domain {
    public class Account : IdentityUser {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public ICollection<Question_Field> Questions { get; set; }
        public Photo Photo { get; set; }
    }
}