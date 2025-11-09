using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApplicaApp.Data;
using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	public class UserRepository: IUserRepository
	{
		public ApplicaAppContext _context;

		public UserRepository(ApplicaAppContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<User>> FetchAllAsync()
		{
			return await _context.Users
				.ToListAsync();
		}
		
		public async Task<IEnumerable<User>> FetchSomeAsync(int page, int limit)
        {
            return await _context.Users
				.Skip((page - 1) * limit)
				.Take(limit)
				.ToListAsync();
        }

		public async Task<User?> FetchByIdAsync(int id)
		{
			return await _context.Users
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<User?> FetchByUidAsync(string uid)
		{
			return await _context.Users
				.FirstOrDefaultAsync(p => p.Uid == uid);
		}

		public async Task<User> CreateAsync(User user)
		{
			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			return user;
		}

		public async Task<User> UpdateAsync(User user)
		{
			_context.Users.Update(user);
			_context.Entry(user).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return user;
		}
		
		public async Task<bool> DeleteAsync(int id)
        {
            var user = await FetchByIdAsync(id);
			if (user != null)
			{
				_context.Users.Remove(user);
				await _context.SaveChangesAsync();
				return true;
			}
			return false;
        }
	}
}