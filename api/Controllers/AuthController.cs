using api.Repositories;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService authService)
    {
        _logger = logger;
        _authService = authService;
    }

    [HttpPost]
    [Route("register")]
    public ActionResult CreateUser(User user)
    {
        if (user == null || !ModelState.IsValid){
            return BadRequest();
        }
        _authService.CreateUser(user);
        return NoContent();
    }

    [HttpGet]
    [Route("login")]

    public ActionResult<string> Signin(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return BadRequest();
        }

        var token = _authService.SignIn(email, password);

        if (string.IsNullOrWhiteSpace(token)) {
            return Unauthorized();
        }

        return Ok(token);
    }

    [HttpGet]
    [Route("user")]
    public ActionResult<User> GetCurrentAuthenticatedUser ()
    {
        var username = User.FindFirstValue(ClaimTypes.Name);

        var user = _authService.GetUserByUsername(username);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet]
    [Route("user/{username}")]
    public ActionResult<User> GetUserByUsername(string username)
    {
        var user = _authService.GetUserByUsername(username);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet]
    [Route("searchUsers")]
    public ActionResult<IEnumerable<User>> SearchUsers(string searchText)
    {
        var users = _authService.SearchUsers(searchText);

        return Ok(users);
    }
}