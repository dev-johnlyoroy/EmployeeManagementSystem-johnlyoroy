using ems.data_access.Database;
using ems.library.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Persistence.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository

    {
        public EmployeeRepository(DbContext context) : base(context)
        {
            // Constructor initializes the repository with the provided DbContext.
        }

        public IEnumerable<Employee> GetActiveEmployees()
        {
            //retrieves all active employes
            return GetAll();
        }
    }
}
