using ReactProjectExample.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Repositories.Custom
{
    public interface IStockRepository : IBase<Stock>
    {
        Stock GetProductStock(long productId); 
    }
}
