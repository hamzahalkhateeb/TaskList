using Backend.Models;
namespace Backend.Models

{
    public class Task
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }
    public string Priority { get; set; } = "low";
    public bool isCompleted { get; set; } = false;
    public List<Subtask> Subtasks { get; set; } = new List<Subtask>();
}
}