using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	public interface IUserRepository
	{
		Task<IEnumerable<User>> FetchAllAsync();
		Task<IEnumerable<User>> FetchSomeAsync(int page, int limit);
		Task<User?> FetchByIdAsync(int id);
		Task<User?> FetchByUidAsync(string uid);
		Task<User> CreateAsync(User user);
		Task<User> UpdateAsync(User user);
		Task<bool> DeleteAsync(int id);
	}
}