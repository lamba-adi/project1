using HousingApp.Models;
using HousingApp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HousingApplication.Models;
using System.Net.Http.Headers;
using System.Data;
using Microsoft.EntityFrameworkCore;

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

    public IActionResult udata(housingApprovalModel uploaddata)

    {

      _Uploadcontext.Housing_Approval.Add(uploaddata);
      _Uploadcontext.SaveChanges();
      return Ok("Success");
    }

    [HttpPost("Approvedata")]

    public async Task<IActionResult> dataapproval(int entryid)
    {
      var dataentry = _Uploadcontext.Housing_Approval.Find(entryid);

      housingApprovedModel entry = new housingApprovedModel();


      
      {
        try
        {
          entry.EmpID = dataentry.EmpID;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.Organisation = dataentry.Organisation;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.Country = dataentry.Country;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.City = dataentry.City;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }


        try
        {
          entry.TypeOfHouse = dataentry.TypeOfHouse;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.CostOfHouse = dataentry.CostOfHouse;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.SizeOfHouse = dataentry.SizeOfHouse;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.Rent = dataentry.Rent;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }

        try
        {
          entry.Tenure = dataentry.Tenure;
        }
        catch (Exception e)
        {
          Console.WriteLine(e.Message);
        }
      }


      await _Uploadcontext.Housing_Approved.AddAsync(entry);
      _Uploadcontext.Housing_Approval.Remove((housingApprovalModel)dataentry);
      _Uploadcontext.SaveChanges();


      return Ok("");
    }

    [HttpGet("approvaldata")]
    public async Task<IEnumerable<housingApprovalModel>> GetEmp()
    {
      return await _Uploadcontext.Housing_Approval.ToListAsync();
    }


    [HttpGet("singledata")]

    public IActionResult GetSingleData(int entryid)
    {
      var userinfo = _Uploadcontext.Housing_Approval.FindAsync(entryid);
      return Ok(userinfo);
    }


    // file upload code
    [HttpPost("UploadFile")]

    public IActionResult UploadBulk()
    {
      try
      {

        var file = Request.Form.Files[0];
        var Identity = Request.Form["ID"];
        var user = _Uploadcontext.empdata.Find(int.Parse(Identity));
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
            housingApprovalModel upload = new housingApprovalModel();
            try
            {
              upload.EmpID = user.Id.ToString();

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.Organisation = "org1";

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.Country = Convert.ToString(dr["Country"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.City = Convert.ToString(dr["Area"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.TypeOfHouse = Convert.ToString(dr["HouseType"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.SizeOfHouse = Convert.ToInt32(dr["HouseSize"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }
            try
            {
              upload.CostOfHouse = Convert.ToInt32(dr["Cost"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.Rent = Convert.ToInt32(dr["Rent"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            try
            {
              upload.Tenure = Convert.ToInt32(dr["RentTenure"]);

            }
            catch (Exception e)
            {
              Console.WriteLine(e.Message);
            }

            
            _Uploadcontext.Housing_Approval.Add(upload);
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

    [HttpPut("updateandPost")]
    public async Task<IActionResult> updateAndPost(int entryid,housingApprovalModel updateentry)
    {
      var entry = _Uploadcontext.Housing_Approval.Find(entryid);
      if (entry == null)
      {
        return NotFound();
      }

      
      entry.Country=updateentry.Country;
      entry.City=updateentry.City;
      entry.Organisation=updateentry.Organisation;
      entry.EmpID=updateentry.EmpID;
      entry.TypeOfHouse=updateentry.TypeOfHouse;
      entry.CostOfHouse=updateentry.CostOfHouse;
      entry.SizeOfHouse=updateentry.SizeOfHouse;
      entry.Rent = updateentry.Rent;
      entry.Tenure=updateentry.Tenure;
      _Uploadcontext.SaveChanges();
      await dataapproval(entryid);
      return Ok("");
    }

    [HttpDelete("RejectData")]

    public IActionResult Delete(int entryID)
    {
      var entry = _Uploadcontext.Housing_Approval.Find(entryID);
        _Uploadcontext.Housing_Approval.Remove((housingApprovalModel)entry);
        _Uploadcontext.SaveChanges();
        return Ok("success");
    }


  }
}

