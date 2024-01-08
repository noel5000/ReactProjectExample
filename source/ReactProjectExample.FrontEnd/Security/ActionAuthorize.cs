using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using ReactProjectExample.Entities;
using ReactProjectExample.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactProjectExample.FrontEnd.Security
{
    public class ActionAuthorize : TypeFilterAttribute
    {
        public ActionAuthorize() : base(typeof(ActionRequirementFilter))
        {


        }




    }

    public class ActionRequirementFilter : IAuthorizationFilter
    {

        readonly IHttpContextAccessor _httpContextAccessor;
        readonly IMemoryCache _cache;

        public ActionRequirementFilter(IHttpContextAccessor httpContextAccessor, IMemoryCache cache)
        {

            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            bool isInvalid = false;
            var currentToken = _httpContextAccessor.HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString();


            if (string.IsNullOrEmpty(currentToken))
                isInvalid = true;

            if (!isInvalid)
            {
                string token = currentToken;
                User user = _cache.Get<User>(token);
                if (user == null)
                    context.Result = new ForbidResult();


            }
            else
                context.Result = new ForbidResult();
        }
    }
}
