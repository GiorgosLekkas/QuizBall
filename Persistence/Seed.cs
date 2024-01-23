using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {
        public static async Task SeedData(DataContext context, UserManager<Account> userManager) {

            /*if (!userManager.Users.Any()){
                var users = new List<Account> {
                    new () {
                        UserName = "glekkas",
                        FirstName = "Giorgos",
                        LastName = "Lekkas",
                        Email = "gl4@gmail.com",
                        Gender = "Male",
                        Role = "Admin"
                    }, new() {
                        UserName = "dools",
                        FirstName = "Maria",
                        LastName = "Stergiou",
                        Email = "dools@gmail.com",
                        Gender = "Female",
                        Role = "Admin"
                    }
                };

                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }*/

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
                },new HistoryQuestion {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnser = "3",
                    Level = "Medium",
                }
            };

            await context.History_Question.AddRangeAsync(hquestions);
            await context.SaveChangesAsync();
        }
    }
}