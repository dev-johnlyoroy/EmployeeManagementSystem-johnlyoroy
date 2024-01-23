using ems.library.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Core
{

    public  interface IUnitOfWork
    {
        //property to access the employee and user repository
        IEmployeeRepository Employee { get; }
        IAccountRepository User { get; }
        int Complete();
    }
}
