using System.ComponentModel.DataAnnotations.Schema;


namespace HousingApp.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String email { get; set; }
        public String password { get; set; }

        public DateTime MemberSince { get; set; }

  }

}
