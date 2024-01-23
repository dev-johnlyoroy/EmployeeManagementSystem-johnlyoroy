using ems.data_access.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.data_access
{
    //perform data access operations
    sealed public  class DalManager
    {
        public static emsEntities NewEntityContext
        {
            get 
            {
                return new emsEntities();    
            }
        }
    }
}

