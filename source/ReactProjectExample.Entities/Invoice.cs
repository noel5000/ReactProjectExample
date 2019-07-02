using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReactProjectExample.Entities
{
  public  class Invoice : BaseEntity
    {
     
        public DateTime BillDate { get; set; }
        public decimal SubTotal { get; set; }

        public decimal Taxes { get; set; }
        public decimal Discount { get; set; }

        public decimal Total { get; set; }

        public IEnumerable<InvoiceDetails> Details { get; set; }


    }
}
