using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApplicaApp.Data;
using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	
	public class ProfileRepository: IProfileRepository
	{
		public ApplicaAppContext _context;

		public ProfileRepository(ApplicaAppContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Profile>> FetchAllAsync()
		{
			return await _context.Profiles
				.ToListAsync();
		}

		public async Task<IEnumerable<Profile>> FetchSomeAsync(int page, int limit)
		{
			return await _context.Profiles
				.Skip((page - 1) * limit)
				.Take(limit)
				.ToListAsync();
		}

		public async Task<Profile?> FetchByIdAsync(int id)
		{
			return await _context.Profiles
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<Profile?> FetchByUserIdAsync(int userId)
		{
			return await _context.Profiles
				.FirstOrDefaultAsync(p => p.UserId == userId);
		}

		public async Task<Profile> CreateAsync(Profile profile)
		{
			_context.Profiles.Add(profile);
			await _context.SaveChangesAsync();
			return profile;
		}

		public async Task<Profile> UpdateAsync(Profile profile)
		{
			_context.Profiles.Update(profile);
			_context.Entry(profile).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return profile;
		}
		
		public async Task<bool> DeleteAsync(int id)
        {
            var profile = await FetchByIdAsync(id);
			if (profile != null)
			{
				_context.Profiles.Remove(profile);
				await _context.SaveChangesAsync();
				return true;
			}
			return false;
        }
	}
}
