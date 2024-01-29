using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models;

public class User
{
    [JsonIgnore]
    public int Id { get; set; }

    [Required]
    public string? Username { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public string? FirstName { get; set; }

    [Required]
    public string? LastName { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string? Gender { get; set; }

    [Required]
    public string? State { get; set; }

    [Required]
    public string? City { get; set; }

    [JsonIgnore]
    public List<Post> Posts { get; set; } = new List<Post>();
    
}