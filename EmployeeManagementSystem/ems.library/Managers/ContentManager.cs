using ems.library.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Managers
{
    public class ContentManager
    {
        // protected property representing the UnitOfWork instance used for coordinating data access operations.
        protected UnitOfWork mWorker { get; set; }

        // constructor initializes the ContentManager with a UnitOfWork instance.
        public ContentManager(UnitOfWork worker)
        {
            mWorker = worker;
        }


    }
}
