using Microsoft.EntityFrameworkCore;
using ApplicaApp.Models;
using System.Reflection;

namespace ApplicaApp.Data
{
	public class ApplicaAppContext : DbContext
	{
		public ApplicaAppContext(DbContextOptions<ApplicaAppContext> options)
			: base(options)
		{ }

		public DbSet<User> Users { get; set; }
		public DbSet<Profile> Profiles { get; set; }
		public DbSet<Application> Applications { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Configure the User entity
			modelBuilder.Entity<User>(entity =>
			{
				entity.Property(u => u.Uid)
					.IsRequired()
					.HasMaxLength(255);

				entity.Property(p => p.CreatedAt)
					.HasDefaultValueSql("CURRENT_TIMESTAMP");

				entity.Property(p => p.LastLogin)
					.HasDefaultValueSql("CURRENT_TIMESTAMP");
			});

			// Configure the Profile entity
			modelBuilder.Entity<Profile>(entity =>
			{
				entity.Property(p => p.Name)
					  .IsRequired()
					  .HasMaxLength(255);

				entity.Property(p => p.Avatar)
					  .HasMaxLength(255);

				entity.Property(p => p.CreatedAt)
					  .HasDefaultValueSql("CURRENT_TIMESTAMP");

				entity.Property(p => p.UpdatedAt)
					  .HasDefaultValueSql("CURRENT_TIMESTAMP");
			});

			// Configure the Application entity
			modelBuilder.Entity<Application>(entity => 
			{
				entity.Property(a => a.Company)  
					.IsRequired()
					.HasMaxLength(255);
				
				entity.Property(a => a.Position)
					.IsRequired()
					.HasMaxLength(255);

				entity.Property(a => a.DateApplied)
					.IsRequired();

				entity.Property(a => a.Status)
					.IsRequired()
					.HasMaxLength(255);

				entity.Property(a => a.Notes)
					.HasMaxLength(1000);  // Consider making this larger for notes

				entity.Property(a => a.CreatedAt)
					.HasDefaultValueSql("CURRENT_TIMESTAMP");

				entity.Property(a => a.UpdatedAt)
					.HasDefaultValueSql("CURRENT_TIMESTAMP");
			});
			
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		
			base.OnModelCreating(modelBuilder);
		}
	}
}