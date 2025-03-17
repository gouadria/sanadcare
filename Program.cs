using System.IO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SanadCare.API.Data;
using SanadCare.API.Data.Models;

var options = new WebApplicationOptions
{
    Args = args,
    ContentRootPath = Directory.GetCurrentDirectory(),
    WebRootPath = "wwwroot"
};

var builder = WebApplication.CreateBuilder(options);

// Ajout des services OpenAPI
builder.Services.AddOpenApi();

// Enregistrement des contrôleurs
builder.Services.AddControllers();

// Configuration de CORS pour autoriser le frontend React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configuration du DbContext avec la chaîne de connexion
builder.Services.AddDbContext<SanadCareDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SanadCareDb")));

// Configuration d'Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<SanadCareDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.Configure<DbContextOptionsBuilder>(options =>
    options.EnableSensitiveDataLogging());

builder.Services.AddAuthorization();

// Forcer Kestrel à écouter sur des URL spécifiques
builder.WebHost.UseUrls("http://localhost:5000", "https://localhost:5001");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Endpoint test pour vérifier le fonctionnement
app.MapGet("/test", () => "Hello World");

app.Run();


