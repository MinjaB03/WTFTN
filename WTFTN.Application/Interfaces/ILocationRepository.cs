using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WTFTN.Domain.Entities;

namespace WTFTN.Application.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAsync();

        Task<Location?> GetByIdAsync(Guid id);

        Task<Location> AddAsync(Location location);

        Task<Location?> UpdateAsync(Location location);

        Task<bool> DeleteAsync(Guid id);
    }
}
