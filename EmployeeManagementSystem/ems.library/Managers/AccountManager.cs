using ems.data_access.Database;
using ems.library.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Managers
{
    public class AccountManager : ContentManager
    {
        public AccountManager(UnitOfWork worker) : base(worker)
        {
        }
        public IEnumerable<User> GetAllActiveUser()
        {
            //retrieves all user
            return mWorker.User.GetActiveUsers();
        }

        public void Add(User user)
        {
            //add the new user
            mWorker.User.Add(user);
            mWorker.Complete();
        }

        public void SetToken(int id, string token)
        {
            //set a security token for the specified user
            var oldUser = mWorker.User.Get(id);
            if (oldUser == null)
                return;

            oldUser.Token = token;
            mWorker.Complete();

        }

        public void Edit(User user)
        {
            //edit details of an existing user
            var oldUser = mWorker.User.Get(user.ID);
            if (oldUser == null)
                return;

            oldUser.Username = user.Username;
            oldUser.Password = user.Password;
            mWorker.Complete();

        }

        public void Delete(User user)
        {
            //delete a user 
            var data = mWorker.User.Get(user.ID);

            mWorker.User.Remove(data);
            mWorker.Complete();

        }
    }
}
