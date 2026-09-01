using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WTFTN.Application.Interfaces
{
    public interface IImageStorageService
    {
        Task<string> SaveImageAsync(Stream fileStream, string fileName);
    }
}