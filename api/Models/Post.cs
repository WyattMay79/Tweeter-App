using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Models;

public class Post
{
  public int Id { get; set; }

  [Required]
  public string? Title { get; set; }

  [Required]
  public string? Content { get; set; }

  [Required]
  public DateTime PublishedOn { get; set; }

  public int UserId { get; set; }
  public required User User { get; set; }
}