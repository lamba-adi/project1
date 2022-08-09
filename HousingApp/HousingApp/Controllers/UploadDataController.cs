using HousingApp.Models;
using HousingApp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HousingApplication.Models;
using System.Net.Http.Headers;
using System.Data;

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

    public IActionResult UploadBulk()
    {
      try
      {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "EmployeeData");
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

          var converter = new CsvTo.CsvConverter(fullPath, true);

          DataTable dt = converter.ToDataTable();
          foreach (DataRow dr in dt.Rows)
          {
            UploadDataModel upload = new UploadDataModel();
            try
            {
              upload.country = Convert.ToString(dr["Country"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.area = Convert.ToString(dr["Area"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.typeOfHouse = Convert.ToString(dr["HouseType"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.sizeOfHouse = Convert.ToString(dr["HouseSize"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }
            try
            {
              upload.costOfHouse = Convert.ToInt32(dr["Cost"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.rent = Convert.ToInt32(dr["Rent"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.rentTenure = Convert.ToInt32(dr["RentTenure"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            
            _Uploadcontext.Upload_DataModel.Add(upload);
            _Uploadcontext.SaveChanges();
          }
          System.IO.File.Delete(fullPath);

          //IEnumerable<string[]> c = converter.ToCollection();

          return Ok(new { dbPath });
        }
        else
        {
          return BadRequest();
        }
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex}");
      }
    }


  }
}

