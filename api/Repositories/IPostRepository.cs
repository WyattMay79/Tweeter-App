using System.Collections.Generic;
using api.Models;

namespace api.Repositories;
public interface IPostRepository
{
    IEnumerable<Post> GetAllPosts();
    IEnumerable<Post> GetPostsByUsername(string username);
    Post CreatePost(Post newPost);
    Post? UpdatePost(Post newPost);
    void DeletePostById(int Id);

}