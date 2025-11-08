using Microsoft.EntityFrameworkCore;

using DotNetEnv;
using ApplicaApp.Data;
using ApplicaApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Load .env file
Env.Load();

// Get connection string from environment or appsettings
builder.Services.AddDbContext<ApplicaAppContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("NEON_CONNECTION")));

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Registered Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

var app = builder.Build();

// Add CORS for development (Vue dev server)
if (builder.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AllowVite");
}
else
{
    app.UseHttpsRedirection();
}

// Enable serving static files from wwwroot
app.UseStaticFiles();

// Add routing
app.UseRouting();
app.UseAuthorization();

// Map your controllers
app.MapControllers();

// Fallback to index.html for Vue Router (must be last!)
app.MapFallbackToFile("index.html");

app.Run();