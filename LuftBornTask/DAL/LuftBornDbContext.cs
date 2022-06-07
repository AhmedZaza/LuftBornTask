using LuftBornTask.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LuftBornTask.DAL
{
    public class LuftBornDbContext : DbContext
    {
        public LuftBornDbContext(DbContextOptions<LuftBornDbContext> options)
        : base(options)
        {

        }
        public DbSet<ApplicationUser> Users { get; set; }
    }
}
