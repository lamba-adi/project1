using System.ComponentModel.DataAnnotations;

namespace HousingApp.Models
{
  public class housingApprovedModel
  {
    [Key]
    public int entryID { get; set; }


    public String EmpID { get; set; }

    public String Organisation { get; set; }

    public String Country { get; set; }

    public String City { get; set; }

    public String TypeOfHouse { get; set; }

    public int SizeOfHouse { get; set; }

    public String CostOfHouse { get; set; }

    public int Rent { get; set; }

    public int Tenure { get; set; }
  }
}
