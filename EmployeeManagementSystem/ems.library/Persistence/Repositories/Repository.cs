using ems.data_access.Database;
using ems.library.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ems.library.Persistence.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {

        protected readonly DbContext Context;

        public Repository(DbContext context)
        {
            //constructor initializes
            Context = context;
        }

        public emsEntities Dal
        {
            //property to access context
            get { return Context as emsEntities; }
        }

        public TEntity Get(int id)
        {
            //retrieves an entity by ID using dbset's find method
            return Context.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            // Note that here I've repeated Context.Set<TEntity>() in every method and this is causing
            // too much noise. I could get a reference to the DbSet returned from this method in the 
            // constructor and store it in a private field like _entities. This way, the implementation
            // of our methods would be cleaner:
            // 
            // _entities.ToList();
            // _entities.Where();
            // _entities.SingleOrDefault();
            // 

            // retrieves all entities using the DbSet's ToList method.
            return Context.Set<TEntity>().ToList();
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            // retrieves entities based on the specified predicate using the DbSet's Where method.
            return Context.Set<TEntity>().Where(predicate);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            // retrieves a single entity based on the specified predicate using the DbSet's SingleOrDefault method.
            return Context.Set<TEntity>().SingleOrDefault(predicate);
        }

        public void Add(TEntity entity)
        {
            // adds a new entity to the database using the DbSet's Add method.
            Context.Set<TEntity>().Add(entity);
        }

        public TEntity AddAndReturn(TEntity entity)
        {
            // adds a new entity to the database and returns the added entity using the DbSet's Add method.
            return Context.Set<TEntity>().Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            // adds a collection of entities to the database using the DbSet's Add method.
            foreach (var entity in entities)
            {
                Context.Set<TEntity>().Add(entity);
            }
        }

        public void Remove(TEntity entity)
        {
            // removes an entity from the database using the DbSet's Remove method.
            Context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            // removes a collection of entities from the database using the DbSet's Remove method.
            foreach (var entity in entities)
            {
                Context.Set<TEntity>().Remove(entity);
            }
        }


    }
}
