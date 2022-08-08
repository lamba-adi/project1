using HousingApp.Models;
using HousingApp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HousingApplication.Models;

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
  }
}
