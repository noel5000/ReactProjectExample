﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Storage;
using ReactProjectExample.EntityFrameWork;

namespace ReactProjectExample.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MainDataContext _DataContext;

        public UnitOfWork(MainDataContext dataContext)
        {
            _DataContext = dataContext;
        }

        public IDbContextTransaction CreateTransaction()
        {
            return this._DataContext.Database.BeginTransaction();
        }

        public int SaveChanges()
        {
            return _DataContext.SaveChanges();
        }

        public void Dispose()
        {
            if (_DataContext != null)
            {
                _DataContext.Dispose();
            }
        }
    }
}
