using ApplicaApp.Models;

namespace ApplicaApp.Repositories
{
	public interface IApplicationRepository
	{
		Task<IEnumerable<Application>> FetchAllAsync();
		Task<IEnumerable<Application>> FetchSomeAsync(int page, int limit);
		Task<IEnumerable<Application>> FetchAllByUserIdAsync(int userId);
		Task<IEnumerable<Application>> FetchSomeByUserIdAsync(int userId, int page, int limit);
		Task<Application> FetchByIdAsync(int id);
		Task<Application> CreateAsync(Application application);
		Task<Application> UpdateAsync(Application application);
		Task<bool> DeleteAsync(int id);
	}
}