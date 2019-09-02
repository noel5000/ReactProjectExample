
using ReactProjectExample.Entities.Interfaces;
using ReactProjectExample.EntityFrameWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Repositories
{
    public class Repository<T> : Base<T, MainDataContext> where T : class, IDeleteEntity, new()
    {
        public Repository(MainDataContext context) : base(context) { }
    }
}
