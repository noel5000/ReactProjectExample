using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Entities.Interfaces
{
    public interface IAuditableEntity
    {
        DateTime CreatedDate { get; set; }
        DateTime UpdatedDate { get; set; }
    }
}
