using System;
using System.Collections.Generic;
using System.Text;

namespace ReactProjectExample.Entities.Models
{
    public class AppSettings
    {


        public string Domain { get; set; }
        public string TokenKey { get; set; }
        public string SBHostUrl { get; set; }
        public short TokenTime { get; set; }
        public int FacilityId { get; set; }
        public int DeviceId { get; set; }
        public int QRCodeSessionHours { get; set; }
        public string SBUserName { get; set; }
        public string SBPassword { get; set; }

    }
}
