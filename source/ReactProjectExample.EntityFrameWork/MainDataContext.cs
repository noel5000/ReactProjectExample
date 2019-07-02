using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ReactProjectExample.Entities;
using ReactProjectExample.Common;
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

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceDetails> InvoiceDetails { get; set; }


        #endregion



        #region Connection String 

        protected override void OnConfiguring(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder optionsBuilder)
        {

                  }

        #endregion

        #region Fluent API

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>()
              .HasMany(p => p.Details)
              .WithOne(t => t.Invoice);
            modelBuilder.Entity<User>().HasKey(u =>new { u.Id ,u.Email});
            modelBuilder.Entity<User>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<User>().HasIndex(x => x.Id).IsUnique();
           

            base.OnModelCreating(modelBuilder);

            foreach (var property in modelBuilder.Model.GetEntityTypes()
              .SelectMany(t => t.GetProperties())
              .Where(p => p.ClrType == typeof(decimal)))
            {
                property.Relational().ColumnType = "decimal(18, 2)";
            }

            var cascadeFKs = modelBuilder.Model.GetEntityTypes().SelectMany(t => t.GetForeignKeys())
                            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;


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

        

        #endregion
    }
}
