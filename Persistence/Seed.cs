using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {
        public static async Task SeedData(DataContext context, UserManager<Account> userManager) {

            if (context.History_Question.Any()) return;
            
            var hquestions = new List<HistoryQuestion> {
                new HistoryQuestion {
                    Question = "Which team has won the most superleague titles?",
                    Answer1 = "Olimpiakos",
                    Answer2 = "AEK",
                    CorrectAnswer = "Olimpiakos",
                    Level = "Easy",
                },
                new HistoryQuestion {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnswer = "3",
                    Level = "Medium",
                },new HistoryQuestion {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnswer = "3",
                    Level = "Medium",
                }
            };

            var gquestions = new List<QuestionGeography> {
                new QuestionGeography {
                    Question = "Which team has won the most superleague titles?",
                    Answer1 = "Olimpiakos",
                    Answer2 = "AEK",
                    CorrectAnswer = "Olimpiakos",
                    Level = "Easy",
                },
                new QuestionGeography {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnswer = "3",
                    Level = "Medium",
                },new QuestionGeography {
                    Question = "How many superleague titles Aris has won?",
                    Answer1 = "4",
                    Answer2 = "3",
                    CorrectAnswer = "3",
                    Level = "Medium",
                }
            };

            await context.History_Question.AddRangeAsync(hquestions);
            await context.Question_Geography.AddRangeAsync(gquestions);
            await context.SaveChangesAsync();
        }
    }
}