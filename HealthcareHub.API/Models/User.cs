
using System.ComponentModel.DataAnnotations;

namespace HealthcareHub.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string GoogleId { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Picture { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
