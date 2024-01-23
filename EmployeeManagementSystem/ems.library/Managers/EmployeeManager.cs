using ems.data_access.Database;
using ems.library.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Managers
{
    public class EmployeeManager : ContentManager
    {
        public EmployeeManager(UnitOfWork worker) : base(worker)
        {
        }
        public IEnumerable<Employee> GetAllActiveEmployees()
        {
            // Implementation retrieves all active employees using the UnitOfWork's Employee repository.
            return mWorker.Employee.GetActiveEmployees();
        }

        public void Add(Employee employee)
        {
            // Add the new employee using the UnitOfWork's Employee repository and commit changes.
            mWorker.Employee.Add(employee);
            mWorker.Complete();
        }

        public Employee GetEmployeeByID(int id)
        {

            // Retrieve an employee by ID using the UnitOfWork's Employee repository.
            return mWorker.Employee.Get(id);
        }

        public void Edit(Employee employee)
        {
            // Edit details of an existing employee using the UnitOfWork's Employee repository and commit changes.
            var oldEmployee = mWorker.Employee.Get(employee.ID);
            if (oldEmployee == null)
                return;

            // Update employee details
            oldEmployee.Name = employee.Name;
            oldEmployee.Position = employee.Position;
            oldEmployee.Department = employee.Department;
            oldEmployee.DateofJoining = employee.DateofJoining;
            oldEmployee.Salary = employee.Salary;
            mWorker.Complete();

        }

        public void Delete(Employee employee)
        {
            // Delete an employee using the UnitOfWork's Employee repository and commit changes.
            var data = mWorker.Employee.Get(employee.ID);

            mWorker.Employee.Remove(data);
            mWorker.Complete();

        }
    }
}
