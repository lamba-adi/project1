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

    [HttpGet("approvalempdata")]
    public async Task<IEnumerable<housingApprovalModel>> GetsingleempDataApproval(string empID)
    {
      var data = await _Uploadcontext.Housing_Approval.Where(datadb => datadb.EmpID == empID).ToListAsync();

      return data;
    }

    [HttpGet("approvedempdata")]
    public async Task<IEnumerable<housingApprovedModel>> GetsingleempDataApproved(string empID)
    {
      var data = await _Uploadcontext.Housing_Approved.Where(datadb => datadb.EmpID == empID).ToListAsync();

      return data;
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

    [HttpGet("countryoptions")]

    public IActionResult getcountries()
    {
      var countries = (from db in _Uploadcontext.Housing_Approved select db.Country).Distinct().OrderBy(name => name);
        return Ok(countries);
    }

    [HttpGet("cityoptions")]

    public IActionResult getcities(string country)
    {
      var cities = (from db in _Uploadcontext.Housing_Approved where db.Country == country select db.City).Distinct().OrderBy(name => name);
      return Ok(cities);
    }

    [HttpGet("compare")]

    public IActionResult compare(string country, string city, string country2, string city2)
    {

      var compareData = new List<string>();
      var costOfHouseUser = (from db in _Uploadcontext.Housing_Approved where db.Country == country where db.City == city select db.CostOfHouse).Average();

      compareData.Add(costOfHouseUser.ToString());

      var rentUser = (from db in _Uploadcontext.Housing_Approved where db.Country == country where db.City == city select db.Rent).Average();

      compareData.Add(rentUser.ToString());

      var tenureUser = (from db in _Uploadcontext.Housing_Approved where db.Country == country where db.City == city select db.Tenure).Average();

      compareData.Add(tenureUser.ToString());

      var costOfHouse = (from db in _Uploadcontext.Housing_Approved where db.Country == country2 where db.City == city2 select db.CostOfHouse).Average();

      compareData.Add(costOfHouse.ToString());

      var rent = (from db in _Uploadcontext.Housing_Approved where db.Country == country where db.City == city select db.Rent).Average();

      compareData.Add(rent.ToString());

      var tenure = (from db in _Uploadcontext.Housing_Approved where db.Country == country where db.City == city select db.Tenure).Average();

      compareData.Add(tenure.ToString());

      return Ok(compareData);
    }
  }

  
}

