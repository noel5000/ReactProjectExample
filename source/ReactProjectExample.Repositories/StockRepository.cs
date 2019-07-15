using ReactProjectExample.Entities;
using ReactProjectExample.EntityFrameWork;
using ReactProjectExample.Repositories.Custom;
using System;
using System.Linq;

namespace ReactProjectExample.Repositories
{
    public class StockRepository : Repository<Stock>, IStockRepository
    {
        public StockRepository(MainDataContext context) : base(context)
        {
        }

        public Stock GetProductStock(long productId)
        {
            return _Context.Stocks.FirstOrDefault(s => s.ProductId == productId && s.DeletedFlag==false) ?? new Stock();
        }
    }
}
