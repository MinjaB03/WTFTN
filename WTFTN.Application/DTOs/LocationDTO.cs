using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WTFTN.Domain.Enums;

namespace WTFTN.Application.DTOs
{
    public class LocationDTO
    {
        public Guid Id {  get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? ThumbnailUrl {  get; set; }
        public LocationCategory Category { get; set; }
        public DateTime CreatedAt {  get; set; }
    }
}
