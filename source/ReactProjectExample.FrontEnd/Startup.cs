using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReactProjectExample.EntityFrameWork;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Globalization;
using ReactProjectExample.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.AspNetCore.SpaServices.Webpack;
using ReactProjectExample.Entities.Models;
using ReactProjectExample.Repositories.Contracts;
using ReactProjectExample.Repositories.Custom;
using Microsoft.OData.Edm;
using Microsoft.AspNet.OData.Builder;
using ReactProjectExample.Entities;
using Microsoft.AspNet.OData.Extensions;

namespace ReactProjectExample.FrontEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            hostingEnvironment = env;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment hostingEnvironment;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
            var connections = Configuration.GetSection("ConnectionStrings").Get<ConnectionStrings>();
            services.AddDbContext<MainDataContext>(options =>
            {
                var connection = new SqlConnection(connections.Main);
                options.UseSqlServer(connection);

            });
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddSingleton<IHostingEnvironment>(hostingEnvironment);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IFileProvider>(
               new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "")));


            //services.AddScoped<IParqueoRepository, ParqueoRepository>();
            services.AddScoped<IStockRepository, StockRepository>();

            services.AddScoped<IDataRepositoriesFactory, DataRepositoriesFactory>();

            //  New instance for injection
            services.AddTransient(typeof(IBase<>), typeof(Repository<>));
            // Add Culture
            var cultureInfo = new CultureInfo("es-DO");
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
             options.TokenValidationParameters = new TokenValidationParameters
             {
                 ValidateIssuer = true,
                 ValidateAudience = true,
                 ValidateLifetime = true,
                 ValidateIssuerSigningKey = true,
                 ValidIssuer = appSettings.Domain,
                 ValidAudience = appSettings.Domain,
                 IssuerSigningKey = new SymmetricSecurityKey(
                 Encoding.UTF8.GetBytes(appSettings.TokenKey)),
                 ClockSkew = TimeSpan.Zero
             });

            services.AddOData();
            services.AddMvc().AddXmlSerializerFormatters();
            services.AddProgressiveWebApp();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
              
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {

                routes.Select().Expand().Filter().OrderBy().MaxTop(null).Count();
                routes.MapODataServiceRoute("odata", "odata", GetEdmModel(app));
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseMvc(routeBuilder => routeBuilder.EnableDependencyInjection());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private static IEdmModel GetEdmModel(IApplicationBuilder app)
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder(app.ApplicationServices);
            builder.EntitySet<Invoice>("Invoices");
            builder.EntitySet<InvoiceDetails>("InvoiceDetails");
            builder.EntitySet<Product>("Products").EntityType.HasKey(p=>p.Id)
                .Filter(Microsoft.AspNet.OData.Query.QueryOptionSetting.Allowed);
            builder.EntitySet<Stock>("Stocks");
            builder.EntitySet<User>("Users");
            return builder.GetEdmModel();
        }
    }
}
