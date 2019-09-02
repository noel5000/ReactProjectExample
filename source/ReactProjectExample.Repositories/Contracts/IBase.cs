using Microsoft.AspNet.OData;
using ReactProjectExample.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace ReactProjectExample.Repositories
{
    public interface IBase
    {
    }

    public interface IBase<T> : IBase
        where T : class, IDeleteEntity, new()
    {
        T Add(T entity);
        void AddRange(IEnumerable<T> entities);

        void Remove(T entity);

        void Remove(long id);

        T Update(T entity);

        IEnumerable<T> GetAll(string sortExpression = null);

        IPagedList<T> GetPaged(int startRowIndex, int pageSize, string sortExpression = null);
        PageResult<T> GetPagedNew(int startRowIndex, int pageSize, string sortExpression = null);

        IEnumerable<T> GetAll(Func<IQueryable<T>, IQueryable<T>> transform, Expression<Func<T, bool>> filter = null, string sortExpression = null);

        IEnumerable<TResult> GetAll<TResult>(Func<IQueryable<T>, IQueryable<TResult>> transform, Expression<Func<T, bool>> filter = null, string sortExpression = null);

        int GetCount<TResult>(Func<IQueryable<T>, IQueryable<TResult>> transform, Expression<Func<T, bool>> filter = null);

        IPagedList<T> GetPaged(Func<IQueryable<T>, IQueryable<T>> transform, Expression<Func<T, bool>> filter = null, int startRowIndex = -1, int pageSize = -1, string sortExpression = null);

        IPagedList<TResult> GetPaged<TResult>(Func<IQueryable<T>, IQueryable<TResult>> transform, Expression<Func<T, bool>> filter = null, int startRowIndex = -1, int pageSize = -1, string sortExpression = null);

        T Get(long id);

        T Get(Guid id);

        TResult Get<TResult>(Func<IQueryable<T>, IQueryable<TResult>> transform, Expression<Func<T, bool>> filter = null, string sortExpression = null);

        bool Exists(long id);

        bool Exists(Func<IQueryable<T>, IQueryable<T>> query, Expression<Func<T, bool>> filter = null);
    }
}
