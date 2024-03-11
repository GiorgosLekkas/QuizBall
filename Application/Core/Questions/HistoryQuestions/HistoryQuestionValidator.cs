using FluentValidation;
using Domain;

namespace Application.Questions {
    public class HistoryQuestionValidator : AbstractValidator<HistoryQuestion> {
        public HistoryQuestionValidator() {
            RuleFor(x => x.Question).NotEmpty();
            RuleFor(x => x.Answer1).NotEmpty();
            RuleFor(x => x.Answer2).NotEmpty();
            RuleFor(x => x.CorrectAnswer).NotEmpty();
            RuleFor(x => x.Level).NotEmpty();
        }
    }
}