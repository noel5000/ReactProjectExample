using ReactProjectExample.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Repositories.Contracts
{
    public interface IDataRepositoriesFactory
    {
        IBase<T> GetDataRepositories<T>() where T : class, IDeleteEntity, new();
        TRepositories GetCustomDataRepositories<TRepositories>() where TRepositories : IBase;
        IUnitOfWork GetUnitOfWork();
    }
}
