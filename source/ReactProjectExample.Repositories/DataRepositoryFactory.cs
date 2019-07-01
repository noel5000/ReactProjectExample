using ReactProjectExample.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;

namespace ReactProjectExample.Repositories
{
    public class DataRepositoriesFactory : IDataRepositoriesFactory
    {
        private readonly IServiceProvider services;

        public DataRepositoriesFactory() { }

        public DataRepositoriesFactory(IServiceProvider services)
        {
            this.services = services;
        }

        public IBase<T> GetDataRepositories<T>() where T : class, new()
        {
            //Import instance of T from the DI container
            var instance = services.GetService<IBase<T>>();

            return instance;
        }

        public TRepositories GetCustomDataRepositories<TRepositories>() where TRepositories : IBase
        {
            //Import instance of the Repositories from the DI container
            var instance = services.GetService<TRepositories>();

            return instance;
        }

        public IUnitOfWork GetUnitOfWork()
        {
            //Import instance of T from the DI container
            var instance = services.GetService<IUnitOfWork>();

            return instance;
        }
    }
}
