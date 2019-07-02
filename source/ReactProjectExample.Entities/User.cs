using ReactProjectExample.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReactProjectExample.Entities
{
  public  class User : IDeleteEntity, IAuditableEntity

    {

    
        public Guid Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(50)]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [Key]
        public string Email { get; set; }
        [MaxLength(500)]
        public string Password { get; set; }
        public bool DeletedFlag { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        [NotMapped]
        public string TokenKey { get; set; }
    }
}
