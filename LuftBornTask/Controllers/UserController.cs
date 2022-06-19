using AutoMapper;
using LuftBornTask.DAL;
using LuftBornTask.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LuftBornTask.Controllers
{
    public class UserController : Controller
    {
        private readonly LuftBornDbContext _context;
        public UserController(LuftBornDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Add(AddUserModel userModel)
        {
            // Create Config for automapper to map from viewmodels and DTOs to DB models and vice versa
            MapperConfiguration config = new MapperConfiguration(cfg =>
                   cfg.CreateMap<AddUserModel, ApplicationUser>()
               );

            Mapper mapper = new Mapper(config);

            ApplicationUser user = mapper.Map<ApplicationUser>(userModel);

            //TODO: Create Users Repository instead of using db context directly
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public IActionResult Delete(DeleteUserModel Model)
        {
            ApplicationUser user = _context.Users.FirstOrDefault(a => a.Id == Model.Id);

            //TODO: Create Users Repository instead of using db context directly
            _context.Remove(user);
            _context.SaveChanges();
            return Ok();
        }
        public IActionResult All()
        {
            return Json(_context.Users.ToList());
        }
        public IActionResult Update(AddUserModel userModel)
        {
            return Ok();
        }
        public IActionResult Delete(AddUserModel userModel)
        {
            return Ok();

        }
    }
}
