using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ems.library.Model;

namespace EmployeeManagementSystem.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login()
        {
            LoginDTO vm = new LoginDTO();

            vm.RememberMe = true;
            return PartialView(vm);
        }

       
    }
}