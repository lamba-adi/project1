using HousingApp.Models;
using HousingApp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HousingApplication.Models;
using System.Net.Http.Headers;

namespace HousingApp.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [EnableCors]
  public class UploadDataController : ControllerBase
  {
    private readonly IConfiguration _config;
    public readonly HousingDbContext _Uploadcontext;
    public UploadDataController(IConfiguration config, HousingDbContext upload_context)
    {
      this._Uploadcontext = upload_context;
      _config = config;
      
    }

    [HttpPost("UploadData")]

    public IActionResult udata(UploadDataModel uploaddata)

    {

      _Uploadcontext.Upload_DataModel.Add(uploaddata);
      _Uploadcontext.SaveChanges();
      return Ok("Success");
    }

    // file upload code
    [HttpPost("UploadFile")]

    public IActionResult Upload()
    {
      try
      {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "Files");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

        if (file.Length > 0)
        {
          var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
          var fullPath = Path.Combine(pathToSave, fileName);
          var dbPath = Path.Combine(folderName, fileName);

          using (var stream = new FileStream(fullPath, FileMode.Create))
          {
            file.CopyTo(stream);
          }
          return Ok(new { dbPath });
        }
        else
        {
          return BadRequest();
        }
      }

      catch (Exception ex)
      {
        return StatusCode(500, $"Internal Server Error:{ex}");
      }
    }

  }
}
