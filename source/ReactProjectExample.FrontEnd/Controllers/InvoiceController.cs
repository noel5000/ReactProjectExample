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
    public class InvoiceController : BaseController<Invoice>
    {
        public InvoiceController(IOptions<AppSettings> appSettings, IDataRepositoriesFactory repositoryFactory) : base(appSettings, repositoryFactory)
        {
        }
    }
}