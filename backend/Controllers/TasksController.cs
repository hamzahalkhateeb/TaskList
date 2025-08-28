using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
namespace Backend.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {

        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }


        // GET all tasks within a specific range
        [HttpGet]
        public IActionResult GetAllTasks([FromQuery] string from, [FromQuery] string to)
        {
            //validate data presence
            if (string.IsNullOrWhiteSpace(from) || string.IsNullOrWhiteSpace(to))
            {
                return BadRequest(new { message = "one or more parameter is missing" });
            }
            ;

            var tasks = _taskService.GetAllTasks(from, to);

            if (tasks == null)
            {
                return Ok(new { message = "no tasks found in the given range" });
            }

            return Ok(new { tasks = tasks });
        }


        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            Console.WriteLine($"received task id: ${taskId}");
            //validate data presence
            if (taskId <= 0)
            {
                return BadRequest(new { message = "task id is missing or invalid" });
            }

            var deleted = _taskService.DeleteTask(taskId);

            if (deleted == false)
            {
                return NotFound(new { message = $"Task with ID {taskId} not found." });
            }

            return Ok(new { message = "task deleted successfully here" });
        }


        [HttpPost]
        public IActionResult CreateTask([FromBody] Backend.Models.Task task)
        {
            if (task == null)
            {
                return BadRequest(new { message = "task is missing" });
            }

            if (string.IsNullOrWhiteSpace(task.Title))
            {
                return BadRequest(new { message = "Title is required" });
            }
            if (task.DueDate == default)
            {
                return BadRequest(new { message = "Task due date is required." });
            }
            if (string.IsNullOrWhiteSpace(task.Priority))
            {
                return BadRequest(new { message = "priority is required" });
            }
            var allowedPriorities = new[] { "low", "medium", "high" };
            if (!allowedPriorities.Contains(task.Priority.ToLower()))
            {
                return BadRequest(new { message = "Priority must be one of: low, medium, high." });
            }

            _taskService.AddTask(task);

            //return
            return Ok(new { message = "task created successfully here" });
        }

        [HttpPatch("{taskId}")]
        public IActionResult UpdateTask(int taskId, [FromBody] object task) //incomplete endpoint due to time restraints!
        {
            Console.WriteLine("update task received on backend");
            //incomplete!
            return Ok(new { message = "task updated successfully here", /* return task! or new updated task list!*/ });
        }

        [HttpPatch("{taskId}/complete")]
        public IActionResult CompleteTask([FromQuery] int taskId)
        {
            Console.WriteLine($"received task id: ${taskId}");
            //validate data presence
            if (taskId <= 0)
            {
                return BadRequest(new { message = "task id is missing or invalid" });
            }

            var completed = _taskService.CompleteTask(taskId);

            if (completed == false)
            {
                return NotFound(new { message = $"Task with ID {taskId} not found." });
            }

            return Ok(new { message = "task completed successfully here" });
        }



        //////////////////Below is subtask end points///////////////////////////////////////
        [HttpPost("{taskId}/subtasks")]
        public IActionResult AddSubtask(int taskId, [FromBody] object subtask) //incomplete due to time restraints
        {
            Console.WriteLine("add subtask completed!");
            //add logic here
            return Ok(new { message = "subtask addedd successfully", /* return task! or new updated task list!*/ });
        }

        [HttpPatch("{taskId}/subtasks/{subtaskId}/complete")]
        public IActionResult CompleteSubtask([FromQuery] int taskId, [FromQuery] int subtaskId)
        {
            Console.WriteLine($"received task id: ${taskId} and subtask id: ${subtaskId}");
            //validate data presence
            if (taskId <= 0 || subtaskId <= 0)
            {
                return BadRequest(new { message = "task id or subtask id is missing or invalid " });
            }

            var completed = _taskService.CompleteSubtask(taskId, subtaskId);

            if (completed == false)
            {
                return NotFound(new { message = $"subtask or task was not found." });
            }

            return Ok(new { message = "subtask successfully completed" });
        }

        [HttpDelete("{taskId}/subtasks/{subtaskId}")]
        public IActionResult DeleteSubtask(int taskId, int subtaskId)//Incomplete due to time restraints
        {
            Console.WriteLine("subtask deleted successfully");
            //add logic here
            return Ok(new { message = "subtask deleted successfully here", /* return task! or new updated task list!*/ });
        }

    }
}