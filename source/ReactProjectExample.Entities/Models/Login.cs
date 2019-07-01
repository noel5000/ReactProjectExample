using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Entities.Models
{
    public class Login
    {
        public string Email { get; set; }

        public string Password { get; set; }
        public Guid UserId { get; set; }
    }
}
