namespace Domain {
    public class QuestionAuthor {
        public string AccountId { get; set; }
        public Account Account { get; set; }
        public Guid QuestionId { get; set; }
        public Question_Field Question { get; set; }
        public bool IsAuthor { get; set; }
    }
}