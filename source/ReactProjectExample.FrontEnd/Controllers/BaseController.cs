using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ReactProjectExample.Entities.Interfaces;
using ReactProjectExample.Entities.Models;
using ReactProjectExample.Repositories;
using ReactProjectExample.Repositories.Contracts;

namespace ReactProjectExample.FrontEnd.Controllers
{
    [Route("api/[controller]")]
    public class BaseController<T> : Controller where T : class, IDeleteEntity, new()
    {
        protected readonly IDataRepositoriesFactory _repositoryFactory;
        protected readonly IOptions<AppSettings> _appSettings;
        protected readonly IBase<T> _baseRepo;
        public BaseController(IOptions<AppSettings> appSettings, IDataRepositoriesFactory repositoryFactory)
        {
            _appSettings = appSettings;
            _repositoryFactory = repositoryFactory;
            this._baseRepo = _repositoryFactory.GetDataRepositories<T>();
        }

        [HttpGet]
        public virtual IActionResult Get()
        {
            try
            {
                var data = _baseRepo.GetAll(x => x.Where(y => y.DeletedFlag == false));
                return Ok(new { status = 0, message = "OK", data = data });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpGet("{id:long}")]
        public virtual IActionResult Get(long id)
        {
            try
            {
                var data = _baseRepo.Get(id);
                return Ok(new { status = 0, message = "OK", data = data });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpGet("{page:int}/{sinze:int}")]
        public virtual IActionResult Get(int page, int size)
        {
            try
            {
                var data = _baseRepo.GetPaged(page, size);
                return Ok(new { status = 0, message = "OK", data = data });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }





        [HttpPost]
        public virtual IActionResult Post([FromBody] T model)
        {
            try
            {
                var activeEntity = model as IDeleteEntity;
                if (activeEntity != null)
                {
                    activeEntity.DeletedFlag = false;
                    model = activeEntity as T;
                }
                var result = _baseRepo.Add(model);

                return Ok(new { status = 0, message = "OK", data = result });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }

        }

        [HttpPut]
        public virtual IActionResult Put([FromBody] T model)
        {
            try
            {
                var result = _baseRepo.Update(model);
                return Ok(new { status = 0, message = "OK", data = result });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }

        }

        [HttpDelete("{id:long}")]
        public virtual IActionResult Delete(long id)
        {
            try
            {
                var model = _baseRepo.Get(id) as IDeleteEntity;
                if (model != null)
                {
                    model.DeletedFlag = true;
                    _baseRepo.Update(model as T);
                }

                return Ok(new { status = 0, message = "OK" });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }

        }

        protected virtual IBase<K> GetDataRepo<K>() where K : class, new()
        {
            return _repositoryFactory.GetDataRepositories<K>();
        }
    }
}
