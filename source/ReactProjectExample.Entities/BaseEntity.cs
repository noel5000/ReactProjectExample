using ReactProjectExample.Entities.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactProjectExample.Entities
{
    public class BaseEntity : IDeleteEntity, IAuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual long Id { get; set; }
        public virtual bool DeletedFlag { get ; set  ; }
        public virtual DateTime CreatedDate { get ; set ; }
        public virtual DateTime UpdatedDate { get; set; }
    }
}
