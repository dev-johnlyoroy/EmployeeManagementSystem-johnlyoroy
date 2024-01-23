using ems.data_access.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Model
{
    public class EmployeeModel
    {
        public int ID { get; set; }
        public string Name { get;set; } 

        public string Position { get; set; }
        public string Department { get; set; }
        public DateTime? DateofJoining { get; set; }
        public int? Salary { get; set; }

        // Constructor initializes the EmployeeModel with data from an existing Employee entity.
        public EmployeeModel(Employee employee)
        { 
            ID = employee.ID;
            Name = employee.Name;
            Position = employee.Position;
            Department = employee.Department;
            DateofJoining = employee.DateofJoining;
            Salary = employee.Salary;
        }


    }

    public class EmployeeModelList
    { 
        public List<EmployeeModel> Employees { get; set; }
        public Employee NewEmployee { get; set; }

        // Default constructor initializes the Employees list.
        public EmployeeModelList()
        { 
            Employees = new List<EmployeeModel>();
        }
    }
}
