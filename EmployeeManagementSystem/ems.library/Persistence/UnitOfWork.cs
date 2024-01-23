using ems.data_access.Database;
using ems.library.Core;
using ems.library.Core.Repositories;
using ems.library.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly emsEntities _context;

        public IEmployeeRepository Employee { get; set; }
        public IAccountRepository User { get; set; }

        public UnitOfWork(emsEntities context)
        {
            // constructor initializes the UnitOfWork with an emsEntities context and creates concrete repository instances.
            _context = context;
            User = new AccountRepository(_context);
            Employee = new EmployeeRepository(_context);
        }

        public int Complete()
        {
            // commits changes to the database using the SaveChanges.
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            // disposes of the underlying emsEntities context.
            _context.Dispose();
        }

    }
}
