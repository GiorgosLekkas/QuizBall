using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {

        public static async Task SeedData(DataContext context, UserManager<Account> userManager) {

            if(!context.Questions.Any()) {
                var account = new Account {
                    FirstName = "admin",
                    LastName = "admin",
                    UserName = "admin",
                    Email = "admin@test.com",
                    Role = "Admin",
                    Gender = "Male"
                };
                var accounts = new List<Account> {
                    account,
                    new Account {
                        FirstName = "Giorgos",
                        LastName = "Lekkas",
                        UserName = "glekkas",
                        Email = "glekkas@test.com",
                        Role = "User",
                        Gender = "Male"
                    }
                };
                foreach (var user in accounts) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var questions = new List<Question_Field>();

                var filePath = "/etc/secrets/questions.csv";
                //var filePath = "../Persistence/questions.csv";

                var csvData = File.ReadAllText(filePath);

                var rows = csvData.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var row in rows) {
                    var columns = row.Split(';');

                    if(columns.Length>=13 && columns[0] != "Question") {
                        var Question = columns[0];
                        var Answer1 = columns[1] != "." ? columns[1] : "-";
                        var Answer2 = columns[2] != "." ? columns[2] : "-";
                        var CorrectAnswer1 = columns[3];
                        var CorrectAnswer2 = columns[4] != "." ? columns[4] : "-";
                        var CorrectAnswer3 = columns[5] != "." ? columns[5] : "-";
                        var CorrectAnswer4 = columns[6] != "." ? columns[6] : "-";
                        var CorrectAnswer5 = columns[7] != "." ? columns[7] : "-";
                        var Level = columns[8];
                        var Category = columns[9];
                        var AuthorName = account.UserName;
                        var Author = account;
                        if(Category == "Find Player By Photo" || Category == "Find The Stadium" || Category == "Guess The Player" || Category == "Logo Quiz" 
                            || Category == "Manager id" || Category == "Player id" || Category == "Who Is Missing")
                            questions.Add(new Question_Field {
                                Question = Question,
                                Answer1 = Answer1,
                                Answer2 = Answer2,
                                CorrectAnswer1 = CorrectAnswer1,
                                CorrectAnswer2 = CorrectAnswer2,
                                CorrectAnswer3 = CorrectAnswer3,
                                CorrectAnswer4 = CorrectAnswer4,
                                CorrectAnswer5 = CorrectAnswer5,
                                Level = Level,
                                Category = Category,
                                Confirmed = "true",
                                Photo = new Photo {
                                    Id = columns[11],
                                    Url = columns[12],
                                },
                                AuthorName = AuthorName,
                                Author = Author
                            });
                        else
                            questions.Add(new Question_Field {
                                Question = Question,
                                Answer1 = Answer1,
                                Answer2 = Answer2,
                                CorrectAnswer1 = CorrectAnswer1,
                                CorrectAnswer2 = CorrectAnswer2,
                                CorrectAnswer3 = CorrectAnswer3,
                                CorrectAnswer4 = CorrectAnswer4,
                                CorrectAnswer5 = CorrectAnswer5,
                                Level = Level,
                                Category = Category,
                                Confirmed = "true",
                                AuthorName = AuthorName,
                                Author = Author
                            });
                        
                    }
                }
                await context.Questions.AddRangeAsync(questions);
                await context.SaveChangesAsync();
            }
        }
    }
}