using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Migrations;
using api.Models;
using Microsoft.IdentityModel.Tokens;
using bcrypt = BCrypt.Net.BCrypt;

namespace api.Repositories;

public class AuthService : IAuthService
{
    private readonly PostDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(PostDbContext context, IConfiguration config){
        _context = context;
        _config = config;
    }

    public User CreateUser(User user)
    {
        var passwordHash = bcrypt.HashPassword(user.Password);
        user.Password = passwordHash;

        _context.Add(user);
        _context.SaveChanges();
        return user;
    }

    public string SignIn( string email, string password)
    {
        var user = _context.User.SingleOrDefault(u => u.Email == email);
        var verified = false;

        if (user != null){
            verified = bcrypt.Verify(password, user.Password);
        }

        if (user == null || !verified)
        {
            return String.Empty;
        }

        return BuildToken(user);
    }

    public User? GetUserByUsername(string username)
    {
        return _context.User.SingleOrDefault(u => u.Username == username);
    }

    public IEnumerable<User> SearchUsers(string searchText)
    {
        return _context.User.Where(u => u.FirstName.Contains(searchText) || u.LastName.Contains(searchText));
    }

    private string BuildToken(User user) {
        var secret = _config.GetValue<string>("TokenSecret");
        var signngKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var signingCredentials = new SigningCredentials(signngKey, SecurityAlgorithms.HmacSha256);

        var claims = new Claim[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
            new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName ?? ""),
            new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName ?? "")
        };

        var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: signingCredentials);
        
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        Console.WriteLine(encodedJwt);

        return encodedJwt;
    }
}