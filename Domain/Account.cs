using Microsoft.AspNetCore.Identity;

namespace Domain {
    public class Account : IdentityUser {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public string Token { get; set; }
    }
}