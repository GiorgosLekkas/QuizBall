namespace Domain {
    public class HistoryQuestion {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string CorrectAnswer { get; set; }
        public string Level { get; set; }
        public string Confirmed { get; set; }
    }
}