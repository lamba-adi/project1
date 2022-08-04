
using HousingApp.Models;
using HousingApplication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;


namespace HousingApplication.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]


    public class UserController : ControllerBase
    {
    string key = "1prt56";
    private readonly IConfiguration _config;
        public readonly HousingDbContext _context;
        private string Encrypt_Password(string password)
        {
            string pswstr = string.Empty;
            byte[] psw_encode = new byte[password.Length];
            psw_encode = System.Text.Encoding.UTF8.GetBytes(password);
            pswstr = Convert.ToBase64String(psw_encode);
            return pswstr;
        }

    public string EncryptPassword(string Encryptval)
    {
      byte[] SrctArray;
      byte[] EnctArray = UTF8Encoding.UTF8.GetBytes(Encryptval);
      SrctArray = UTF8Encoding.UTF8.GetBytes(key);
      TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();
      MD5CryptoServiceProvider objcrpt = new MD5CryptoServiceProvider();
      SrctArray = objcrpt.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
      objcrpt.Clear();
      objt.Key = SrctArray;
      objt.Mode = CipherMode.ECB;
      objt.Padding = PaddingMode.PKCS7;
      ICryptoTransform crptotrns = objt.CreateEncryptor();
      byte[] resArray = crptotrns.TransformFinalBlock(EnctArray, 0, EnctArray.Length);
      objt.Clear();
      return Convert.ToBase64String(resArray, 0, resArray.Length);
    }
    public UserController(IConfiguration config, HousingDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("CreateUser")]

        public IActionResult Create(EmployeeModel user)
        {
            //check if user is already exist or not 
            if (_context.empdata.Where(u => u.email == user.email).FirstOrDefault() != null)
            {
                return Ok("AlreadyRegistered");
            }
            user.MemberSince = DateTime.Now;
            user.password = EncryptPassword(user.password);
            _context.Entry(user).State = EntityState.Modified;
            _context.empdata.Add(user);
            _context.SaveChanges();
            return Ok("Success");
        }
    }
}
