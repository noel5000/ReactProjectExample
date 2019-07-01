using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ReactProjectExample.Entities.Interfaces;
using System;
using System.Linq;

namespace ReactProjectExample.EntityFrameWork
{
    public class MainDataContext : DbContext
    {
        private readonly IHttpContextAccessor _HttpContextAccessor;

        //private bool CanUseSessionContext { get; set; }
        //public ComplaintDataContext()
        //{
        //    CanUseSessionContext = true;
        //}

        public MainDataContext(DbContextOptions<MainDataContext> options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _HttpContextAccessor = httpContextAccessor;

            //CanUseSessionContext = true;
        }
        #region Tables

        //public virtual DbSet<Usuario> Usuarios { get; set; }
       
        
        #endregion

       

        #region Connection String 

        protected override void OnConfiguring(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder optionsBuilder)
        {

            //  optionsBuilder.UseSqlServer(_config.GetConnectionString("Default"));
            //var extConfiguration = optionsBuilder.Options.Extensions.OfType<SqlServerOptionsExtension>().FirstOrDefault();

            //if (extConfiguration != null)
            //    extConfiguration.Connection.StateChange += Connection_StateChange;

            //optionsBuilder.UseSqlServer("Server=dev.afcg.biz;Database=SAEE_Complaint;Persist Security Info=False;User ID=complaintuser;Password=1qaz@wsx;Trusted_Connection=False;");
            //optionsBuilder.UseSqlServer("Server=localhost;Database=SAEE_Complaint;Persist Security Info=False;User ID=sa;Password=thmd;Trusted_Connection=False;");
            //optionsBuilder.UseSqlServer("Server=az-mipe-temp.cloudapp.net, 57500;Database=SAEE_Complaint;Persist Security Info=False;User ID=complaintuser;Password=1qaz@wsx;Trusted_Connection=False;");
        }

        #endregion

        #region Fluent API

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            base.OnModelCreating(modelBuilder);

        }

        #endregion

        #region Save Changes
        public override int SaveChanges()
        {
            // Get the entries that are auditable
            var auditableEntitySet = ChangeTracker.Entries<IAuditableEntity>();

            if (auditableEntitySet != null)
            {

                DateTime currentDate = DateTime.Now;

                // Audit set the audit information foreach record
                foreach (var auditableEntity in auditableEntitySet.Where(c => c.State == EntityState.Added || c.State == EntityState.Modified))
                {
                    if (auditableEntity.State == EntityState.Added)
                    {
                        auditableEntity.Entity.CreatedDate = currentDate;
                    }

                    auditableEntity.Entity.UpdatedDate = currentDate;
                }
            }

            return base.SaveChanges();
        }

        #endregion

        #region Session Context

        //private void Connection_StateChange(object sender, System.Data.StateChangeEventArgs e)
        //{
        //    //if (CanUseSessionContext && e.CurrentState == ConnectionState.Open && _HttpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
        //    if ( e.CurrentState == ConnectionState.Open && _HttpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
        //    {
        //        //Get the username from his claims
        //        Guid userId = Guid.Parse(_HttpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

        //        var connection = sender as SqlConnection;

        //        var cmd = connection.CreateCommand();
        //        cmd.CommandText = @"exec sp_set_session_context @key=N'UserId', @value=@UserId";
        //        cmd.Parameters.AddWithValue("@UserId", userId);

        //        try
        //        {
        //            cmd.ExecuteNonQuery();
        //        }
        //        catch //This is because the dev server is working with Sql Server 2014 and we need SQL Server 2016
        //        {
        //           // CanUseSessionContext = false;
        //        }
        //    }
        //}

        #endregion
    }
}
