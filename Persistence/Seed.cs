using Domain;

namespace Persistence {
    public class Seed {
        public static async Task SeedData(DataContext context) {
            if (context.Users.Any()) return;
            
            var appusers = new List<AppUser> {
                new AppUser {
                    FirstName = "Giorgos",
                    LastName = "Lekkas",
                    UserName = "glekkas4",
                    Email = "glekkas4@test.com",
                    Password = "1234N",
                    Gender = "Male",
                    BirthDate = DateOnly.MinValue,
                    Role = "Admin"
                },
                new AppUser {
                    FirstName = "Maria",
                    LastName = "Strergiou",
                    UserName = "mstergiou29",
                    Email = "mstergiou29@test.com",
                    Password = "1234N",
                    Gender = "Female",
                    Role = "User"
                },
                new AppUser {
                    FirstName = "Maria1",
                    LastName = "Strergiou1",
                    UserName = "mstergiou291",
                    Email = "mstergiou291@test.com",
                    Password = "1234N1",
                    Gender = "Female",
                    Role = "User"
                }
            };

            if (context.History_Question.Any()) return;
            
            var hquestions = new List<HistoryQuestion> {
                new HistoryQuestion {
                    Question = "Which team has won the most superleague titles?",
                    Answer1 = "Olimpiakos",
                    Answer2 = "AEK",
                    CorrectAnser = "Olimpiakos",
                    Level = "Easy",
                },
                new HistoryQuestion {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnser = "3",
                    Level = "Medium",
                }
            };

            await context.Users.AddRangeAsync(appusers);
            await context.History_Question.AddRangeAsync(hquestions);
            await context.SaveChangesAsync();
        }
    }
}