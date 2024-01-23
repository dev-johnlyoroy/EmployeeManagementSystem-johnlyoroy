using ems.api.Authorization;
using ems.api.Controllers.BaseController;
using ems.data_access.Database;
using ems.library.Managers;
using ems.library.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ems.api.Controllers
{
    public class EmployeeController : ApiBaseController
    {

        /// <summary>
        /// Get All the Values
        /// </summary>
        /// <remarks>
        /// Get All the String Values
        ///
        /// GET /api/values HTTP/1.1
        /// 
        /// Host: example.com
        /// 
        /// Authorization: Bearer "token"
        /// 
        /// 
        /// </remarks>
        /// <returns>A list of products.</returns>
        [Authorizations]
        [Route("employee/getemployees")]
        [HttpGet]
        // GET: Employee
        public EmployeeModelList Employees()
        {
            EmployeeManager em = new EmployeeManager(Worker);
            EmployeeModelList vm = new EmployeeModelList
            {
                Employees = em.GetAllActiveEmployees().Select(e => new EmployeeModel(e)).ToList()
            };
            return vm;
        }

        [Authorizations]
        [Route("employee/createemployees")]
        [HttpPost]
        public IHttpActionResult CreateEmployee(Employee employee)
        {
            EmployeeManager emp = new EmployeeManager(Worker);

            emp.Add(employee);

            return Ok();
        }

        [Authorizations]
        [Route("employee/getemployee/{id}")]
        [HttpGet]
        public IHttpActionResult GetEmployeeById(int id)
        {
            EmployeeManager em = new EmployeeManager(Worker);
            Employee employee = em.GetEmployeeByID(id);

            if (employee == null)
            {
                return NotFound(); // or appropriate HTTP status code
            }

            return Ok(employee);
        }

    

        [Authorizations]
        [Route("employee/editemployee")]
        [HttpPut]
        public IHttpActionResult EditEmployee(Employee employee)
        {
            try
            {
                EmployeeManager em = new EmployeeManager(Worker);
                em.Edit(employee);
                return Ok("Employee updated successfully");
            }
            catch (Exception ex)
            {
                // log the exception or handle it appropriately
                return InternalServerError(ex);
            }
        }

        [Authorizations]
        [Route("employee/deleteemployee/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteEmployee(int id)
        {
            try
            {
                EmployeeManager em = new EmployeeManager(Worker);
                // Retrieve the employee data using the provided ID
                var employeeToDelete = em.GetEmployeeByID(id);

                if (employeeToDelete == null)
                {
                    // employee not found
                    return NotFound(); // or appropriate HTTP status code
                }

                // perform the delete operation based on the retrieved employee data
                em.Delete(employeeToDelete);
                return Ok("Employee deleted successfully");
            }
            catch (Exception ex)
            {
                // log the exception or handle it appropriately
                return InternalServerError(ex);
            }
        }


       
    }
}
