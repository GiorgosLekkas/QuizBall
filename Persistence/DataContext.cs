using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : DbContext {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<HistoryQuestion> History_Question { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<QuestionGeography> Question_Geography { get; set; }
        public DbSet<Question_Field> Questions { get; set; }
    }
}