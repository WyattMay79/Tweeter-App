using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Migrations;

public class PostDbContext : DbContext
{
    public DbSet<Post> Post { get; set; }
    public DbSet<User> User { get; set; }

    public PostDbContext(DbContextOptions<PostDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Post>(entity =>{
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.PublishedOn).IsRequired();
            entity.HasOne(e => e.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(e => e.UserId);
        });

        modelBuilder.Entity<User>(entity =>{
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username).IsRequired();
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.Email).IsRequired();
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(e => e.FirstName).IsRequired();
            entity.Property(e => e.LastName).IsRequired();
            entity.Property(e => e.Age).IsRequired();
            entity.Property(e => e.Gender).IsRequired();
            entity.Property(e => e.State).IsRequired();
            entity.Property(e => e.City).IsRequired();
        });
    }
}