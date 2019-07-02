using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReactProjectExample.Entities
{
    public class InvoiceDetails :BaseEntity
    {
        public long ProductId { get; set; }
        public long InvoiceId { get; set; }
        public decimal Quantity { get; set; }
        public decimal SubTotal { get; set; }

        public decimal Taxes { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }

        #region Foreigns keys

        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        #endregion
    }
}
