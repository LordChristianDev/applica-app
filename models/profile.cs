using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicaApp.Models
{
	public class Profile
	{
		[Key]
		public int Id { get; set; }
		
		[Required]
		public int UserId { get; set; }

		[Required]
		[MaxLength(255)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(255)]
		public string Avatar { get; set; } = string.Empty;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	}
}