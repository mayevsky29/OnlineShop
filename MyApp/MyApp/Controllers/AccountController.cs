using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Data.Entities.Identity;
using MyApp.Helpers;
using MyApp.Models;
using MyApp.Services;
using System.Drawing;
using System.Drawing.Imaging;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly AppEFContext _context;
        private readonly ILogger<AccountController> _logger;
        public AccountController(UserManager<AppUser> userManager,
            IJwtTokenService jwtTokenService, IMapper mapper,
            AppEFContext context, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtTokenService = jwtTokenService;
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            var img = ImageWorker.FromBase64StringToImage(model.Photo);
            string randomFilename = Path.GetRandomFileName() + ".jpeg";
            var dir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", randomFilename);
            img.Save(dir, ImageFormat.Jpeg);
            var user = _mapper.Map<AppUser>(model);
            user.Photo = randomFilename;
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(new { errors = result.Errors });


            return Ok(new { token = _jwtTokenService.CreateToken(user) });
        }

        [HttpGet]
        [Authorize]
        [Route("users")]
        public async Task<IActionResult> Users()
        {
            Thread.Sleep(2000);
            var list = await _context.Users.Select(x => _mapper.Map<UserItemViewModel>(x))
                .AsQueryable().ToListAsync();

            return Ok(list);
        }

        /// <summary>
        /// Вхід на сайт
        /// </summary>
        /// <param name="model">Подель із даними</param>
        /// <returns>Повертає токен авторизації</returns>
        /// <remarks>Awesomeness!</remarks>
        /// <response code="200">Login user</response>
        /// <response code="400">Login has missing/invalid values</response>
        /// <response code="500">Oops! Can't create your login right now</response>
        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TokenResponceViewModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            _logger.LogInformation("Login user");
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                //throw new AppException("Bad login user");
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    return Ok(new TokenResponceViewModel { token = _jwtTokenService.CreateToken(user) });
                }
            }
            return BadRequest(new { error = "Користувача не знайдено" });
        }

        // видалення користувача
        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] UserDeleteModel deleteModel)
        {
            return await Task.Run(async () => {
                // пошук користувача
                AppUser user = await _userManager.FindByEmailAsync(deleteModel.Email);
                if (user != null)
                {
                    if (!string.IsNullOrEmpty(user.Photo))
                    {
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "uploads", user.Photo);
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                    }
                    
                    await _userManager.DeleteAsync(user);
                }
                return Ok();
            });
        }

        // редагування користувача
        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> Update([FromBody] UserEditModel model)
        {
            return await Task.Run(async () => {
                IActionResult res = Ok();
                // перевірка чи користувач зареєстрований
                AppUser user = await _userManager.FindByEmailAsync(model.OldEmail);
                AppUser us = await _userManager.FindByEmailAsync(model.Email);
                if (us == null || user.Email.Equals(us.Email))
                {
                    user.Email = model.Email;
                    user.FirstName = model.FirstName;
                    user.SecondName = model.SecondName;
                    user.Phone = model.Phone;
                    user.UserName = model.Email;

                    // робота з фото(перевірка, формування змін, збереження)
                    if (!string.IsNullOrEmpty(model.Photo))
                    {
                        if (!string.IsNullOrEmpty(user.Photo))
                        {
                            string oldPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", user.Photo);
                            System.IO.File.Delete(oldPath);
                        }
                        string filename = Path.GetRandomFileName() + ".jpg";
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "uploads",
                            filename);
                        Bitmap bmp = ImageWorker.FromBase64StringToImage(model.Photo);
                        bmp.Save(path, ImageFormat.Jpeg);
                        user.Photo = filename;
                    }
                    // оновлення даних про користувача
                    await _userManager.UpdateAsync(user);
                    return res;
                }
                else
                {
                    //Повернення помилки якщо емейл уже існує в БД
                    ErrorMainModel model = new ErrorMainModel();
                    model.Errors = new ErrorBodyModel();
                    model.Errors.Email = new string[] { "Аккаунт вже зареєстровано!" };
                    return BadRequest(model);
                }

            });
        }

    }
}
