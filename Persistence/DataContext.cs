using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<Account> {
        public DataContext(DbContextOptions options) : base(options) {

        }

        public DbSet<HistoryQuestion> History_Question { get; set; }
    }
}