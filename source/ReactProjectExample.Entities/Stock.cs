using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReactProjectExample.Entities
{
  public  class Stock :BaseEntity
    {
        [NotMapped]
        public override long Id { get => base.Id; set => base.Id = value; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ProductId { get; set; }
        public decimal Quantity { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
