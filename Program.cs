var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AllowVite");
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