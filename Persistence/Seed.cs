using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {

        public static async Task SeedData(DataContext context, UserManager<Account> userManager) {

            var accounts = new List<Account> {
                new Account {
                    FirstName = "admin",
                    LastName = "admin",
                    UserName = "admin",
                    Email = "admin@test.com",
                    Role = "Admin",
                    Gender = "Male"
                }
            };

            /*var questions = new List<Question_Field> {
                new Question_Field {
                    Id = "12341234213sdf4j1hg24hjg",
                    Question = "123",
                    Answer1 = "123",
                    Answer2 = "123",
                    CorrectAnswer = "123",
                    Level = "Medium",
                    Category = "Guess The Player",
                    Confirmed = "false",
                    Authors = new List<QuestionAuthor>{
                        new QuestionAuthor{
                            Account = new Account{
                                FirstName = "admin",
                                LastName = "admin",
                                UserName = "admin",
                                Password = "Pa$$w0rd",
                                Email = "admin@test.com",
                                Role = "Admin",
                                Gender = "Male"
                            },
                            IsAuthor = true
                        }
                    }
                }
            };*/
            foreach (var user in accounts) {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
            await context.SaveChangesAsync();
        }
    }
}