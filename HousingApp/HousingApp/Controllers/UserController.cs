
using HousingApp.Models;
using HousingApplication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HousingApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly UserContext _context;
        private string Encrypt_Password(string password)
        {
            string pswstr = string.Empty;
            byte[] psw_encode = new byte[password.Length];
            psw_encode = System.Text.Encoding.UTF8.GetBytes(password);
            pswstr = Convert.ToBase64String(psw_encode);
            return pswstr;
        }
        public UserController(IConfiguration config, UserContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("CreateUser")]

        public IActionResult Create(User user)
        {
            //check if user is already exist or not 
            if (_context.Users.Where(u => u.email == user.email).FirstOrDefault() != null)
            {
                return Ok("AlreadyRegistered");
            }
            user.MemberSince = DateTime.Now;
            user.password = Encrypt_Password(user.password);
            _context.Entry(user).State = EntityState.Modified;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Success");
        }
    }
}
