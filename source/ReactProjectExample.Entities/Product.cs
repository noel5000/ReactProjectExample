using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReactProjectExample.Entities
{
 public   class Product :BaseEntity
    {
        [MaxLength(50)]
        public string Name { get; set; }
        public decimal Price { get; set; }
        [MaxLength(200)]
        public string BarCode { get; set; }
        public decimal Cost { get; set; }
        public bool IsService { get; set; }
    }
}
