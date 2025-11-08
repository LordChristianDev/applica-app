using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicaApp.Models
{
	 public class Application
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Company { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Position { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string DateApplied { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Status { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Notes { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}