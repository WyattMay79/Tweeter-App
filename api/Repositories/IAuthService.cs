using api.Models;

namespace api.Repositories;

public interface IAuthService 
{
    User CreateUser(User user);
    string SignIn(string email, string password);
    User? GetUserByUsername(string username);
    IEnumerable<User> SearchUsers(string searchText);
    
}
