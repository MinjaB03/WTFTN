using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using WTFTN.Application.Interfaces;

namespace WTFTN.Infrastructure.Storage
{
    public class LocalImageStorageService : IImageStorageService
    {
        private readonly string _uploadPath;

        public LocalImageStorageService()
        {
            _uploadPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "uploads",
                "locations"
            );
        }

        public async Task<string> SaveImageAsync(
            Stream fileStream,
            string fileName)
        {
            Directory.CreateDirectory(_uploadPath);

            var extension = Path.GetExtension(fileName);

            var newFileName =
                $"{Guid.NewGuid()}{extension}";

            var fullPath =
                Path.Combine(_uploadPath, newFileName);

            using var outputStream =
                new FileStream(fullPath, FileMode.Create);

            await fileStream.CopyToAsync(outputStream);

            return $"/uploads/locations/{newFileName}";
        }
    }
}