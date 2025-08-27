using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



//add controllers here
builder.Services.AddControllers();
builder.Services.AddSingleton<TaskService>();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.MapControllers();


app.Run();

