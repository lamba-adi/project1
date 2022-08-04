using System.ComponentModel.DataAnnotations;

namespace HousingApp.Models
{
  public class adminLoginModel
  {
    [Key]
    public String EmpEmail { get; set; }


    public String EmpPassword { get; set; }
  }
}
