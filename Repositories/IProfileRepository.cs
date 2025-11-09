using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	public interface IProfileRepository
	{
		Task<IEnumerable<Profile>> FetchAllAsync();
		Task<IEnumerable<Profile>> FetchSomeAsync(int page, int limit);
		Task<Profile?> FetchByIdAsync(int id);
		Task<Profile?> FetchByUserIdAsync(int userId);
		Task<Profile> CreateAsync(Profile profile);
		Task<Profile> UpdateAsync(Profile profile);
		Task<bool> DeleteAsync(int id);
	}
}