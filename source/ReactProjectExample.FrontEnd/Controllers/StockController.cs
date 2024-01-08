using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ReactProjectExample.Entities;
using ReactProjectExample.Entities.Models;
using ReactProjectExample.FrontEnd.Security;
using ReactProjectExample.Repositories.Contracts;
using ReactProjectExample.Repositories.Custom;

namespace ReactProjectExample.FrontEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionAuthorize]
    public class StockController : BaseController<Stock>
    {
        private readonly IStockRepository stockRepo;
        public StockController(IOptions<AppSettings> appSettings, IDataRepositoriesFactory repositoryFactory) : base(appSettings, repositoryFactory)
        {
            this.stockRepo = _repositoryFactory.GetCustomDataRepositories<IStockRepository>();
        }

        [HttpGet("GetProductStock/{productId:long}")]
        public IActionResult GetProductStock(long productId)
        {
            try
            {
                var data = stockRepo.GetProductStock(productId);
                data.ProductId = data.ProductId == 0 ? productId : data.ProductId;
                return Ok(new { status = 0, message = "OK", data = data });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }


        [HttpPost]
        public override IActionResult Post([FromBody] Stock model)
        {
            try
            {
                var exist = stockRepo.GetProductStock(model.ProductId);

                if (exist.ProductId > 0)
                {
                    exist.Quantity = model.Quantity;
                    stockRepo.Update(exist);
                }
                else
                    exist = stockRepo.Add(model);

                return Ok(new { status = 0, message = "OK", data = exist });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }

        }
    }
}