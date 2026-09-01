using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WTFTN.Application.Interfaces;
using WTFTN.Domain.Entities;
using WTFTN.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace WTFTN.Infrastructure.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDbContext _context;

        public LocationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Location>> GetAllAsync()
        {
            return await _context.Locations.ToListAsync();
        }

        public async Task<Location?> GetByIdAsync(Guid id)
        {
            return await _context.Locations.FindAsync(id);
        }

        public async Task<Location> AddAsync(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return location;
        }

        public async Task<Location?> UpdateAsync(Location location)
        {
            var existingLocation =
                await _context.Locations.FindAsync(location.Id);

            if (existingLocation == null)
                return null;

            existingLocation.Name = location.Name;
            existingLocation.Description = location.Description;
            existingLocation.Latitude = location.Latitude;
            existingLocation.Longitude = location.Longitude;
            existingLocation.ThumbnailUrl = location.ThumbnailUrl;

            await _context.SaveChangesAsync();

            return existingLocation;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var location = await _context.Locations.FindAsync(id);

            if (location == null)
                return false;

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
