using Microsoft.AspNetCore.Mvc;
using ApplicaApp.Models;
using ApplicaApp.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicaApp.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProfilesController : ControllerBase
	{
		private readonly IProfileRepository _repository;

		public ProfilesController(IProfileRepository repository)
		{
			_repository = repository;
		}

		[HttpGet]
		public IActionResult HealthCheck()
		{
			return Ok(new { message = "Profiles API is Working " });
		}
		
		[HttpGet("fetch-all")]
        public async Task<ActionResult<IEnumerable<Profile>>> FetchAllProfiles()
        {
            return Ok(await _repository.FetchAllAsync());
        }

		[HttpPost("fetch-some")]
		public async Task<ActionResult<IEnumerable<Profile>>> FetchSomeProfiles([FromBody] PaginationRequest request)
		{
			return Ok(await _repository.FetchSomeAsync(request.Page, request.Limit));
		}

		[HttpGet("fetch-by-id/{id}")]
		public async Task<ActionResult<Profile>> FetchById(int id)
		{
			var product = await _repository.FetchByIdAsync(id);
			if (product == null)
				return NotFound();

			return Ok(product);
		}

		[HttpGet("fetch-by-user-id/{userId}")]
		public async Task<ActionResult<Profile>> FetchByUserId(int userId)
		{
			var product = await _repository.FetchByUserIdAsync(userId);
			if (product == null)
				return NotFound();

			return Ok(product);
		}

		/**
         * Mutations 
         */

		[HttpPost("create")]
        public async Task<ActionResult<Profile>> Create([FromBody] Profile profile)
        {
            var data = await _repository
                .CreateAsync(profile);

            return CreatedAtAction(nameof(FetchById), new { id = data.Id }, data);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<Profile>> Update(int id, [FromBody] Profile profile)
        {
            if (id != profile.Id)
                return BadRequest();

            var updatedProduct = await _repository.UpdateAsync(profile);
            return Ok(updatedProduct);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Profile>> Delete(int id)
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