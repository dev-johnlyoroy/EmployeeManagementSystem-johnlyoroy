using ems.data_access.Database;
using ems.data_access;
using ems.library.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    public class BaseController : Controller
    {
        private emsEntities _dal;

        public emsEntities Dal
        {
            get
            {
                if (_dal == null)
                    _dal = DalManager.NewEntityContext;

                return _dal;
            }
        }

        protected UnitOfWork Worker
        {
            get { return new UnitOfWork(Dal); }
        }

    }
}