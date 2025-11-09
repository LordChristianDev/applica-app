using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApplicaApp.Data;
using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	public class ApplicationRepository : IApplicationRepository
	{
		public ApplicaAppContext _context;

		public ApplicationRepository(ApplicaAppContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Application>> FetchAllAsync()
		{
			return await _context.Applications
				.ToListAsync();
		}

		public async Task<IEnumerable<Application>> FetchSomeAsync(int page, int limit)
		{
			return await _context.Applications
				.Skip((page - 1) * limit)
				.Take(limit)
				.ToListAsync();
		}
		
		public async Task<IEnumerable<Application>> FetchAllByUserIdAsync(int userId)
		{
			return await _context.Applications
				.Where(p => p.UserId == userId)
				.ToListAsync();
		}

		public async Task<IEnumerable<Application>> FetchSomeByUserIdAsync(int userId, int page, int limit)
		{
			return await _context.Applications
				.Where(p => p.UserId == userId)
				.Skip((page - 1) * limit)
				.Take(limit)
				.ToListAsync();
		}

		public async Task<Application?> FetchByIdAsync(int id)
		{
			return await _context.Applications
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<Application> CreateAsync(Application application)
		{
			_context.Applications.Add(application);
			await _context.SaveChangesAsync();
			return application;
		}

		public async Task<Application> UpdateAsync(Application application)
		{
			_context.Applications.Update(application);
			_context.Entry(application).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return application;
		}
		
		public async Task<bool> DeleteAsync(int id)
        {
            var application = await FetchByIdAsync(id);
			if (application != null)
			{
				_context.Applications.Remove(application);
				await _context.SaveChangesAsync();
				return true;
			}
			return false;
        }
	}
}