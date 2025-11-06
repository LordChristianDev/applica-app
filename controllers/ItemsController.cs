using ApplicaApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApplicaApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        [HttpGet("overview")]
        public IActionResult Overview()
        {
            var item = new Item { Name = "Keyboard" };
            return Ok(item);
        }

        [HttpGet("edit")]
        public IActionResult Edit(int id)
        {
            return Ok(new { id = id, message = "Editing item " + id });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var items = new List<Item>
            {
                new Item { Id = 1, Name = "Keyboard" },
                new Item { Id = 2, Name = "Mouse" }
            };
            return Ok(items);
        }
    }
}