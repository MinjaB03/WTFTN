using Microsoft.AspNetCore.Mvc;
using WTFTN.Application.DTOs;
using WTFTN.Application.Interfaces;
using WTFTN.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using WTFTN.Domain.Enums;

namespace WTFTN.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IImageStorageService _imageStorageService;

        public LocationsController(ILocationRepository locationRepository, IImageStorageService imageStorageService)
        {
            _locationRepository = locationRepository;
            _imageStorageService = imageStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<LocationDTO>>> GetAll()
        {
            var locations = await _locationRepository.GetAllAsync();

            var result = locations.Select(location => new LocationDTO
            {
                Id = location.Id,
                Name = location.Name,
                Description = location.Description,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                ThumbnailUrl = location.ThumbnailUrl,
                Category = location.Category,
                CreatedAt = location.CreatedAt
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocationDTO>> GetById(Guid id)
        {
            var location = await _locationRepository.GetByIdAsync(id);

            if (location == null)
                return NotFound();

            var result = new LocationDTO
            {
                Id = location.Id,
                Name = location.Name,
                Description = location.Description,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                ThumbnailUrl = location.ThumbnailUrl,
                Category = location.Category,
                CreatedAt = location.CreatedAt
            };

            return Ok(result);
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<ActionResult<LocationDTO>> Create(CreateLocationDTO dto)
        {
            var location = new Location
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                ThumbnailUrl = dto.ThumbnailUrl,
                Category = dto.Category,
                CreatedAt = DateTime.UtcNow
            };

            await _locationRepository.AddAsync(location);

            var result = new LocationDTO
            {
                Id = location.Id,
                Name = location.Name,
                Description = location.Description,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                ThumbnailUrl = location.ThumbnailUrl,
                Category = location.Category,
                CreatedAt = location.CreatedAt
            };

            return CreatedAtAction(
                nameof(GetById),
                new { id = location.Id },
                result
            );
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<LocationDTO>> Update(
            Guid id,
            UpdateLocationDto dto)
        {
            var location = new Location
            {
                Id = id,
                Name = dto.Name,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                ThumbnailUrl = dto.ThumbnailUrl,
                Category = dto.Category,
            };

            var updatedLocation =
                await _locationRepository.UpdateAsync(location);

            if (updatedLocation == null)
                return NotFound();

            var result = new LocationDTO
            {
                Id = updatedLocation.Id,
                Name = updatedLocation.Name,
                Description = updatedLocation.Description,
                Latitude = updatedLocation.Latitude,
                Longitude = updatedLocation.Longitude,
                ThumbnailUrl = updatedLocation.ThumbnailUrl,
                Category = updatedLocation.Category,
                CreatedAt = updatedLocation.CreatedAt
            };

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _locationRepository.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("upload-thumbnail")]
        public async Task<ActionResult<string>> UploadThumbnail(
    IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is required.");

            var allowedExtensions =
                new[] { ".jpg", ".jpeg", ".png", ".webp" };

            var extension =
                Path.GetExtension(file.FileName)
                    .ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
                return BadRequest("Unsupported file type.");

            await using var stream =
                file.OpenReadStream();

            var relativeUrl =
                await _imageStorageService.SaveImageAsync(
                    stream,
                    file.FileName);

            return Ok(relativeUrl);
        }
    }
}