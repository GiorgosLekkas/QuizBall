using Application.Profiles;

namespace Application.Core.Questions {
    public class Question_FieldDto {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string CorrectAnswer1 { get; set; }
        public string CorrectAnswer2 { get; set; }
        public string CorrectAnswer3 { get; set; }
        public string CorrectAnswer4 { get; set; }
        public string CorrectAnswer5 { get; set; }
        public string Level { get; set; }
        public string Category { get; set; }
        public string Confirmed { get; set; }
        public string AuthorName { get; set; }
        public ICollection<Profile> Authors { get; set; }
    }
}