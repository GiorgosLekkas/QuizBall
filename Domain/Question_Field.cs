namespace Domain {
    public class Question_Field {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public Photo Photo { get; set; }
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
        public string AuthorId { get; set; }
        public Account Author { get; set; }
    }
}