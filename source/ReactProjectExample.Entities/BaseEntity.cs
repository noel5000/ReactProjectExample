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
        public long Id { get; set; }
        public bool DeletedFlag { get ; set  ; }
        public DateTime CreatedDate { get ; set ; }
        public DateTime UpdatedDate { get; set; }
    }
}
