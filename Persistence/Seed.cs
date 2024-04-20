using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {

        public static async Task SeedData(DataContext context, UserManager<Account> userManager) {

            var account = new Account {
                FirstName = "admin",
                LastName = "admin",
                UserName = "admin",
                Email = "admin@test.com",
                Role = "Admin",
                Gender = "Male"
            };
            var accounts = new List<Account> {
                account
            };
            foreach (var user in accounts) {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            var questions = new List<Question_Field> {
                new Question_Field {
                    Question = "How many Super League titles has Pao won?",
                    Answer1 = "20",
                    Answer2 = "21",
                    CorrectAnswer1 = "20",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Easy",
                    Category = "History",
                    Confirmed = "false",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
                new Question_Field {
                    Question = "How many Super League titles has Aris won?",
                    Answer1 = "3",
                    Answer2 = "4",
                    CorrectAnswer1 = "3",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Medium",
                    Category = "History",
                    Confirmed = "false",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
                new Question_Field {
                    Question = "Which team has won Super League title apart from big 5?",
                    Answer1 = "OFI",
                    Answer2 = "AEL",
                    CorrectAnswer1 = "AEL",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Hard",
                    Category = "History",
                    Confirmed = "true",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
                new Question_Field {
                    Question = "When was the first time Greece participated in World Cup? ",
                    Answer1 = "1994",
                    Answer2 = "1990",
                    CorrectAnswer1 = "1994",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Easy",
                    Category = "History",
                    Confirmed = "true",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
                new Question_Field {
                    Question = "When did Pao played against Ajax in Champions League/Champion Clubs' Cup final?",
                    Answer1 = "1970",
                    Answer2 = "1971",
                    CorrectAnswer1 = "1971",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Medium",
                    Category = "History",
                    Confirmed = "true",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
                new Question_Field {
                    Question = "When did Champion Clubs' Cup renamed to Champions League?",
                    Answer1 = "1992",
                    Answer2 = "1990",
                    CorrectAnswer1 = "1992",
                    CorrectAnswer2 = "-",
                    CorrectAnswer3 = "-",
                    CorrectAnswer4 = "-",
                    CorrectAnswer5 = "-",
                    Level = "Hard",
                    Category = "History",
                    Confirmed = "true",
                    AuthorName = "admin",
                    Authors = new List<QuestionAuthor> {
                        new QuestionAuthor  {
                            Account = account,
                            IsAuthor = true
                        }
                    }
                },
            };

            await context.Questions.AddRangeAsync(questions);
            await context.SaveChangesAsync();
        }
    }
}