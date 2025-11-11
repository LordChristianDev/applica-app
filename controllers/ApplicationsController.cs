using Microsoft.AspNetCore.Mvc;
using ApplicaApp.Models;
using ApplicaApp.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicaApp.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ApplicationsController : ControllerBase
	{
		private readonly IApplicationRepository _repository;

		public ApplicationsController(IApplicationRepository repository)
		{
			_repository = repository;
		}

		[HttpGet]
		public IActionResult HealthCheck()
		{
			return Ok(new { message = "Applications API is Working " });
		}

		/**
         * Queries 
         */

		[HttpGet("fetch-all")]
        public async Task<ActionResult<IEnumerable<Application>>> FetchAllApplications()
        {
            return Ok(await _repository.FetchAllAsync());
        }

		[HttpPost("fetch-some")]
		public async Task<ActionResult<IEnumerable<Application>>> FetchSomeApplications([FromBody] PaginationRequest request)
		{
			return Ok(await _repository.FetchSomeAsync(request.Page, request.Limit));
		}

		[HttpGet("fetch-all-user-id/{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> FetchAllApplicationsWithUserId(int userId)
        {
            return Ok(await _repository.FetchAllByUserIdAsync(userId));
        }

		[HttpPost("fetch-some-user-id/{userId}")]
		public async Task<ActionResult<IEnumerable<Application>>> FetchAllApplicationsWithUserId(int userId, [FromBody] PaginationRequest request)
		{
			return Ok(await _repository.FetchSomeByUserIdAsync(userId, request.Page, request.Limit));
		}

		[HttpGet("fetch-by-id/{id}")]
		public async Task<ActionResult<Application>> FetchById(int id)
		{
			var product = await _repository.FetchByIdAsync(id);
			if (product == null)
				return NotFound();

			return Ok(product);
		}

		/**
         * Mutations 
         */

		[HttpPost("create")]
        public async Task<ActionResult<Application>> Create([FromBody] Application application)
        {
            var data = await _repository
                .CreateAsync(application);

            return CreatedAtAction(nameof(FetchById), new { id = data.Id }, data);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<Application>> Update(int id, [FromBody] Application application)
        {
            if (id != application.UserId)
                return BadRequest();

            var updatedProduct = await _repository.UpdateAsync(application);
            return Ok(updatedProduct);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Application>> Delete(int id)
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