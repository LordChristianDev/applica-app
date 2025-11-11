using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using DotNetEnv;
using ApplicaApp.Data;
using ApplicaApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Load .env file (only in development)
if (builder.Environment.IsDevelopment())
{
    Env.Load();
}

// Get connection string from environment or appsettings
var connectionString = Environment.GetEnvironmentVariable("NEON_CONNECTION") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicaAppContext>(options =>
    options.UseNpgsql(connectionString));

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
    
    // Production CORS policy (adjust your-domain.com to your actual domain)
    options.AddPolicy("Production", policy =>
    {
        policy.WithOrigins("https://your-domain.com", "https://www.your-domain.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Registered Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AllowVite");
}
else
{
    app.UseHttpsRedirection();
    app.UseCors("Production"); // Use production CORS policy
}

// Serve static files from wwwroot/client/dist
var clientDistPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "client", "dist");

if (Directory.Exists(clientDistPath))
{
    // Serve default files (index.html)
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        DefaultFileNames = new List<string> { "index.html" },
        FileProvider = new PhysicalFileProvider(clientDistPath)
    });

    // Serve static files (JS, CSS, images, etc.)
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(clientDistPath),
        RequestPath = ""
    });
}
else
{
    // Fallback to default wwwroot if dist doesn't exist
    app.UseStaticFiles();
}

// Add routing
app.UseRouting();
app.UseAuthorization();

// Map your API controllers
app.MapControllers();

// Fallback to index.html for Vue Router (must be last!)
// This handles client-side routing
if (Directory.Exists(clientDistPath))
{
    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(clientDistPath)
    });
}
else
{
    app.MapFallbackToFile("index.html");
}

app.Run();