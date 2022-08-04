using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using HousingApp.Models;
using System.IdentityModel.Tokens.Jwt;

namespace HousingApp.Models
{
  public class JWTService
  {
    public String SecretKey { get; set; }
    public int tokenDuration { get; set; }

    private readonly IConfiguration config;

    public JWTService(IConfiguration _config)
    {
      config = _config;
      this.SecretKey = config.GetSection("jwtConfig").GetSection("Key").Value;
      this.tokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
    }

    public string generateToken(String id, String firstName, String lastName, String email)
    {
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
      var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var payload = new[]
      {
                new Claim("id",id),
                new Claim("firstname",firstName),
                new Claim("lastname",lastName),
                new Claim("email",email)
            };

      var jwtToken = new JwtSecurityToken(
          issuer: "localhost",
          audience: "localhost",
          claims: payload,
          expires: DateTime.Now.AddMinutes(tokenDuration),
          signingCredentials: signature
          );
      return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
  }
}
