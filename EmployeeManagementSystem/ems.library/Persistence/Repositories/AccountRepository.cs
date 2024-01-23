using ems.data_access.Database;
using ems.library.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Persistence.Repositories
{
    public class AccountRepository : Repository<User>, IAccountRepository
    {
        public AccountRepository(DbContext context) : base(context) 
        {
            // Constructor initializes the repository with the provided DbContext.
        }

        public IEnumerable<User> GetActiveUsers()
        {
            //retrieves all active users
            return GetAll();
        }
    }
}
