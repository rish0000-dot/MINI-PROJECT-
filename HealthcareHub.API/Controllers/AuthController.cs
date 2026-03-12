
using HealthcareHub.API.Data;
using HealthcareHub.API.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthcareHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthRequest request)
        {
            try
            {
                // 1. Verify Google JWT Token (credential)
                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Credential, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _configuration["GoogleAuth:ClientId"] }
                });

                if (payload == null)
                {
                    return BadRequest(new { message = "Invalid Google token." });
                }

                // 2. Check if user already exists in SQL Server Database
                var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == payload.Subject);

                if (user == null)
                {
                    // 3. If User doesn't exist, Create new User (Extracting data from token)
                    user = new User
                    {
                        GoogleId = payload.Subject,
                        Name = payload.Name,
                        Email = payload.Email,
                        Picture = payload.Picture,
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                // 4. Return user info
                return Ok(new
                {
                    success = true,
                    user = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.Picture
                    }
                });
            }
            catch (InvalidJwtException)
            {
                return BadRequest(new { message = "The token is not valid." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error.", error = ex.Message });
            }
        }
    }

    public class GoogleAuthRequest
    {
        public string Credential { get; set; } = string.Empty;
    }
}
