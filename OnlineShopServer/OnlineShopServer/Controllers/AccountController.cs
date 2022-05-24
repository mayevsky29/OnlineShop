using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShopServer.Models;

namespace OnlineShopServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterViewModel model)
        {
            return BadRequest(new
            {
                message = "Такий користувач уже є!"
            });
            return Ok();
        }
    }
}
