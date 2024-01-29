using System.Security.Principal;
using System.Linq;
using api.Migrations;
using api.Models;

namespace api.Repositories;

public class PostRepository : IPostRepository 
{
    private readonly PostDbContext _context;

    public PostRepository(PostDbContext context)
    {
        _context = context;
    }

    public Post CreatePost(Post newPost)
    {
        _context.Post.Add(newPost);
        _context.SaveChanges();
        return newPost;
    }

    public void DeletePostById(int postId)
    {
        var post = _context.Post.Find(postId);
        if (post != null) {
            _context.Post.Remove(post); 
            _context.SaveChanges();
        }
    }

    public IEnumerable<Post> GetAllPosts()
    {
        return _context.Post.ToList();
    }

    public IEnumerable<Post> GetPostsByUsername(string username)
    {
        return _context.Post
        .Where(p => p.User.Username == username)
        .ToList();
    }

    public Post? UpdatePost(Post newPost)
    {
        var originalPost = _context.Post.Find(newPost.Id);
        if (originalPost != null) {
            originalPost.Content = newPost.Content;
            originalPost.PublishedOn = newPost.PublishedOn;
            _context.SaveChanges();
        }
        return originalPost;
    }
}