using Microsoft.AspNetCore.Mvc;

namespace HousingApp.Controllers
{
  public class AdminDataController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
