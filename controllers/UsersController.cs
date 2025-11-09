using Microsoft.AspNetCore.Mvc;
using ApplicaApp.Models;
using ApplicaApp.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicaApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UsersController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult HealthCheck()
        {
            return Ok(new { message = "Users API is Working " });
        }
        
        /**
         * Queries 
         */

        [HttpGet("fetch-all")]
        public async Task<ActionResult<IEnumerable<User>>> FetchAllUsers()
        {
            return Ok(await _repository.FetchAllAsync());
        }

        [HttpPost("fetch-some")]
        public async Task<ActionResult<IEnumerable<User>>> FetchSomeAsync([FromBody] PaginationRequest request)
        {
            return Ok(await _repository.FetchSomeAsync(request.Page, request.Limit));
        }

        [HttpGet("fetch-by-id/{id}")]
        public async Task<ActionResult<User>> FetchById(int id)
        {
            var product = await _repository.FetchByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpGet("fetch-by-uid/{uid}")]
        public async Task<ActionResult<User>> FetchtByUid(string uid)
        {
            var product = await _repository
                .FetchByUidAsync(uid);

            if (product == null)
                return NotFound();
                
            return Ok(product);
        }

        /**
         * Mutations 
         */

        [HttpPost("create")]
        public async Task<ActionResult<User>> Create([FromBody] User user)
        {
            var data = await _repository
                .CreateAsync(user);

            return CreatedAtAction(nameof(FetchById), new { id = data.Id }, data);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<User>> Update(int id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest();

            var updatedProduct = await _repository.UpdateAsync(user);
            return Ok(updatedProduct);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var deletedProduct = await _repository.DeleteAsync(id);
            return Ok(deletedProduct);
        }

        public class PaginationRequest
        {
            public int Page { get; set; } = 1;
            public int Limit { get; set; } = 10;
        }
    }
}