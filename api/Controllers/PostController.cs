using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ILogger<PostController> _logger;
        private readonly IPostRepository _postRepository;

        public PostController(ILogger<PostController> logger, IPostRepository postRepository)
        {
            _logger = logger;
            _postRepository = postRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PostController>> GetPost()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpGet]
        [Route("user/{username}")]
        public ActionResult<IEnumerable<Post>> GetPostByUsername(string username)
        {
            var post = _postRepository.GetPostsByUsername(username);
            if(post == null){
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<Post> CreateNewPost(Post post)
        {
            if (!ModelState.IsValid || post == null) {
                return BadRequest();
            }
            var newPost = _postRepository.CreatePost(post);
            return Created(nameof(GetPostByUsername), newPost);
        }

        [HttpPut]
        [Route("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult DeletePost(int id)
        {
            _postRepository.DeletePostById(id);
            return NoContent();
        }
    }

}
