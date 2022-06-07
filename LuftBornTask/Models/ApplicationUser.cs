using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LuftBornTask.Models
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
