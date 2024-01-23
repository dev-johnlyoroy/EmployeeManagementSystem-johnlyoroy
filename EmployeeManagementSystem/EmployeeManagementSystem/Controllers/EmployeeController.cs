using ems.data_access.Database;
using ems.library.Managers;
using ems.library.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    public class EmployeeController : BaseController
    {
        public ActionResult WelcomePage()
        {

            return View();
        }
        // GET: Employee
        public ActionResult Employees()
        {
           
            return View();
        }



    }
}