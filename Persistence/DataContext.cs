using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : DbContext {
        public DataContext(DbContextOptions options) : base(options) {

        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<HistoryQuestion> History_Question { get; set; }
    }
}