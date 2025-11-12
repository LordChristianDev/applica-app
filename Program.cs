using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using DotNetEnv;
using ApplicaApp.Data;
using ApplicaApp.Repositories;

var builder = WebApplication.CreateBuilder(args);
Env.Load();
DotNetEnv.Env.Load();

// Get connection string from environment or appsettings
var connectionString = Environment.GetEnvironmentVariable("NEON_CONNECTION");

if (string.IsNullOrWhiteSpace(connectionString))
{
    Console.WriteLine("❌ ERROR: NEON_CONNECTION environment variable is not set. Exiting application.");
    Environment.Exit(1);
}

builder.Services.AddDbContext<ApplicaAppContext>(options =>
    options.UseNpgsql(connectionString));

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
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
}

// Use CORS
app.UseCors("AllowAll");

// Important: Don't use HTTPS redirection in Docker for now
// app.UseHttpsRedirection();

// Serve static files from wwwroot/client/dist
var clientDistPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "client", "dist");

Console.WriteLine($"Looking for client files at: {clientDistPath}");
Console.WriteLine($"Directory exists: {Directory.Exists(clientDistPath)}");

if (Directory.Exists(clientDistPath))
{
    Console.WriteLine("Files in dist:");
    foreach (var file in Directory.GetFiles(clientDistPath, "*.*", SearchOption.AllDirectories))
    {
        Console.WriteLine($"  - {file}");
    }

    // Serve default files (index.html)
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        DefaultFileNames = new List<string> { "index.html" },
        FileProvider = new PhysicalFileProvider(clientDistPath),
        RequestPath = ""
    });

    // Serve static files (JS, CSS, images, etc.)
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(clientDistPath),
        RequestPath = "",
        OnPrepareResponse = ctx =>
        {
            Console.WriteLine($"Serving file: {ctx.File.Name}");
        }
    });
}
else
{
    Console.WriteLine("WARNING: Client dist directory not found! Falling back to default wwwroot");
    app.UseStaticFiles();
}

// Add routing
app.UseRouting();
app.UseAuthorization();

// Map your API controllers
app.MapControllers();

// Fallback to index.html for Vue Router (must be last!)
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

Console.WriteLine("Application configured and ready!");

app.Run();