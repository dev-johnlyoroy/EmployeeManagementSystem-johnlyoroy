using ems.data_access.Database;
using ems.data_access;
using ems.library.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ems.api.Controllers.BaseController
{
    public class ApiBaseController : ApiController
    {
        private emsEntities _dal;

        //access the emsEntities data context.
        public emsEntities Dal
        {
            get
            {
                if (_dal == null)
                    _dal = DalManager.NewEntityContext;

                return _dal;
            }
        }

        // Protected property to access the UnitOfWork instance.
        protected UnitOfWork Worker
        {
            get { return new UnitOfWork(Dal); }
        }
    }
}