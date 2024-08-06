using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<Account> {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<HistoryQuestion> History_Question { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<QuestionGeography> Question_Geography { get; set; }
        public DbSet<Question_Field> Questions { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<QuestionAuthor>(x => x.HasKey(aa => new {aa.AccountId, aa.QuestionId}));

            /*builder.Entity<QuestionAuthor>()
                .HasOne(u => u.Account)
                .WithMany(a => a.Questions)
                .HasForeignKey(aa => aa.AccountId);

            builder.Entity<QuestionAuthor>()
                .HasOne(u => u.Question)
                .WithMany(a => a.Authors)
                .HasForeignKey(aa => aa.QuestionId);*/

            /*builder.Entity<Question_Field>()
                .HasOne(a => a.Author)
                .WithMany(aa => aa.Questions)
                .OnDelete(DeleteBehavior.Cascade);*/

            builder.Entity<Question_Field>()
                .HasOne(q => q.Author)
                .WithMany(a => a.Questions)
                .HasForeignKey(q => q.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Account>()
                .HasMany(a => a.Questions)
                .WithOne(q => q.Author)
                .HasForeignKey(q => q.AuthorId);
        }
    }
}