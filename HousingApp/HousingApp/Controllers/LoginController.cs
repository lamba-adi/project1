using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using System.Text;

using HousingApp.Models;
using HousingApplication.Models;

namespace HousingApp.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LoginController : Controller
  {
    //string key = "1prt56";
    private readonly HousingDbContext _empContext;
    private readonly IConfiguration _config;


    public LoginController(HousingDbContext empContext, IConfiguration config)
    {
      this._empContext = empContext;
      _config = config;
    }

    private string Encrypt_Password(string password)
    {
      string pswstr = string.Empty;
      byte[] psw_encode = new byte[password.Length];
      psw_encode = System.Text.Encoding.UTF8.GetBytes(password);
      pswstr = Convert.ToBase64String(psw_encode);
      return pswstr;
    }

    /*public string DecryptPassword(string DecryptText)
    {
      byte[] SrctArray;
      byte[] DrctArray = Convert.FromBase64String(DecryptText);
      SrctArray = UTF8Encoding.UTF8.GetBytes(key);
      TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();
      MD5CryptoServiceProvider objmdcript = new MD5CryptoServiceProvider();
      SrctArray = objmdcript.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
      objmdcript.Clear();
      objt.Key = SrctArray;
      objt.Mode = CipherMode.ECB;
      objt.Padding = PaddingMode.PKCS7;
      ICryptoTransform crptotrns = objt.CreateDecryptor();
      byte[] resArray = crptotrns.TransformFinalBlock(DrctArray, 0, DrctArray.Length);
      objt.Clear();
      return UTF8Encoding.UTF8.GetString(resArray);
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
    }*/


    [HttpGet]
    public async Task<IEnumerable<EmployeeModel>> GetEmp()
    {
      return await _empContext.empdata.ToListAsync();
    }

    [AllowAnonymous]
    [HttpPost("userLogin")]
    public IActionResult userLogin(userLoginModel user)
    {
      var useravailable = _empContext.empdata.Where(userdb => userdb.email == user.EmpEmail && userdb.password == Encrypt_Password(user.EmpPassword)).FirstOrDefault();
      if (useravailable != null)
      {
        return Ok(new JWTService(_config).generateUserToken( useravailable.Id.ToString(), useravailable.firstName, useravailable.lastName, useravailable.email, "User"));
      }
      return Ok("failure");
    }



    [AllowAnonymous]
    [HttpPost("adminLogin")]
    public IActionResult adminLogin(adminLoginModel admin)
    {
      var useravailable = _empContext.admindata.Where(admindb => admindb.EmpEmail == admin.EmpEmail && admindb.EmpPassword == admin.EmpPassword).FirstOrDefault();
      if (useravailable != null)
      {
        return Ok(new JWTService(_config).generateAdminToken("1", "Admin", "lname", useravailable.EmpEmail, "Admin"));

      }
      return Ok("failure");
    }

  }
}
