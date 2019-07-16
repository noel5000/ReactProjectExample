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

namespace ReactProjectExample.FrontEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ActionAuthorize]
    public class ProductsController : BaseController<Product>
    {
        public ProductsController(IOptions<AppSettings> appSettings, IDataRepositoriesFactory repositoryFactory) : base(appSettings, repositoryFactory)
        {
        }

        [HttpGet("FilterProductsByName/{name}")]
        public IActionResult FilterProductsByName(string name)
        {
            try
            {
                var data = _baseRepo.GetAll(x => x.Where(y => y.DeletedFlag == false && y.Name.Contains(name)));
                return Ok(new { status = 0, message = "OK", data = data });
            }

            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }

        }
    }
}