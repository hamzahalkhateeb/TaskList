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
            //get tasks and convert them to a json string
            var tasks = _taskService.GetAllTasks(from, to);



            if (tasks == null)
            {
                return Ok(new { message = "no tasks found in the given range" });
            }



            return Ok(new { message = "retrieved tasks sucessfully", tasks = tasks });
        }


        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            Console.WriteLine("received delete task on backend!");
            //add logic here
            return Ok(new { message = "deleted task successfully here", /* nothing here*/ });
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] object task)//might need to add some data validation here!
        {
            Console.WriteLine("received create a task on backend!");
            //verify the data
            //call on the AddTask function from services
            return Ok(new { message = "task created successfully here", /* return task! or new updated task list!*/ });
        }

        [HttpPatch("{taskId}")]
        public IActionResult UpdateTask(int taskId, [FromBody] object task)//might need to add some data validation here!
        {
            Console.WriteLine("update task received on backend");
            //add logic here
            return Ok(new { message = "task updated successfully here", /* return task! or new updated task list!*/ });
        }

        [HttpPatch("{taskId}/complete")]
        public IActionResult CompleteTask(int taskId)//might need to add some data validation here!
        {
            Console.WriteLine("Task completed successfully");
            //add logic here
            return Ok(new { message = "task completed successfully here", /* return task! or new updated task list!*/ });
        }
        //////////////////Below is subtask end points///////////////////////////////////////
        [HttpPost("{taskId}/subtasks")]
        public IActionResult AddSubtask(int taskId, [FromBody] object subtask)//might need to add some data validation here!
        {
            Console.WriteLine("add subtask completed!");
            //add logic here
            return Ok(new { message = "subtask addedd successfully", /* return task! or new updated task list!*/ });
        }

        [HttpPatch("{taskId}/subtasks/{subtaskId}/complete")]
        public IActionResult CompleteSubtask(int taskId, int subtaskId)//might need to add some data validation here!
        {
            Console.WriteLine("subtask completed successfully");
            //add logic here
            return Ok(new { message = "subtask completed successfully here", /* return task! or new updated task list!*/ });
        }

        [HttpDelete("{taskId}/subtasks/{subtaskId}")]
        public IActionResult DeleteSubtask(int taskId, int subtaskId)//might need to add some data validation here!
        {
            Console.WriteLine("subtask deleted successfully");
            //add logic here
            return Ok(new { message = "subtask deleted successfully here", /* return task! or new updated task list!*/ });
        }

    }
}