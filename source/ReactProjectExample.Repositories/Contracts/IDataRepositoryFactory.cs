using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Repositories.Contracts
{
    public interface IDataRepositoriesFactory
    {
        IBase<T> GetDataRepositories<T>() where T : class, new();
        TRepositories GetCustomDataRepositories<TRepositories>() where TRepositories : IBase;
        IUnitOfWork GetUnitOfWork();
    }
}
