using System.Globalization;
using System.Linq.Expressions;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services
{
    public class TaskService
    {
        //declare data structure to house tasks
        //in this case, I will use a Dictionary
        //the following is mock up data!
        private readonly Dictionary<string, List<Backend.Models.Task>> _tasksByDate = new Dictionary<string, List<Backend.Models.Task>>
        {
            ["2025-08-25"] = new List<Backend.Models.Task>
                {
                    new Backend.Models.Task
                    {
                        Id = 1,
                        Title = "Code Review",
                        Description = "Review teammate's pull requests",
                        DueDate = DateTime.Parse("2025-08-25"),
                        Priority = "high",
                        Progress = 50,
                        isCompleted = false,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 1, Title = "Review PR #101", IsCompleted = true },
                            new Subtask { Id = 2, Title = "Review PR #102", IsCompleted = false }
                        }
                    },
                    new Backend.Models.Task
                    {
                        Id = 2,
                        Title = "Upskill on Observables",
                        Description = "Practice RxJS operators",
                        DueDate = DateTime.Parse("2025-08-25"),
                        Priority = "medium",
                        isCompleted = true,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 3, Title = "Watch tutorial", IsCompleted = true },
                            new Subtask { Id = 4, Title = "Try examples", IsCompleted = false }
                        }
                    }
                },
            ["2025-08-26"] = new List<Backend.Models.Task>
                {
                    new Backend.Models.Task
                    {
                        Id = 3,
                        Title = "Fix Bug #232",
                        Description = "Resolve login page bug",
                        DueDate = DateTime.Parse("2025-08-26"),
                        Priority = "high",
                        isCompleted = false,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 5, Title = "Identify bug source", IsCompleted = true },
                            new Subtask { Id = 6, Title = "Write unit test", IsCompleted = false }
                        }
                    },
                    new Backend.Models.Task
                    {
                        Id = 4,
                        Title = "Mentor Junior Dev",
                        Description = "Guide new team member on Angular project",
                        DueDate = DateTime.Parse("2025-08-26"),
                        Priority = "medium",
                        isCompleted = false,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 7, Title = "Explain code structure", IsCompleted = true },
                            new Subtask { Id = 8, Title = "Assign small task", IsCompleted = false }
                        }
                    }
                },

            ["2025-08-27"] = new List<Backend.Models.Task>
                {
                    new Backend.Models.Task
                    {
                        Id = 5,
                        Title = "Merge Changes",
                        Description = "Merge feature branch into main",
                        DueDate = DateTime.Parse("2025-08-27"),
                        Priority = "high",
                        isCompleted = false,
                        Progress = 0,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 9, Title = "Resolve conflicts", IsCompleted = false },
                            new Subtask { Id = 10, Title = "Run tests", IsCompleted = false }
                        }
                    },
                    new Backend.Models.Task
                    {
                        Id = 6,
                        Title = "Sprint Retrospective",
                        Description = "Participate in sprint retro meeting",
                        DueDate = DateTime.Parse("2025-08-27"),
                        Priority = "low",
                        isCompleted = true,
                        Progress = 100,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 11, Title = "Prepare notes", IsCompleted = true },
                            new Subtask { Id = 12, Title = "Discuss blockers", IsCompleted = true }
                        }
                    }
                },

            ["2025-08-28"] = new List<Backend.Models.Task>
                {
                    new Backend.Models.Task
                    {
                        Id = 7,
                        Title = "Update Documentation",
                        Description = "Update API docs for latest release",
                        DueDate = DateTime.Parse("2025-08-28"),
                        Priority = "medium",
                        isCompleted = false,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 13, Title = "Check existing docs", IsCompleted = true },
                            new Subtask { Id = 14, Title = "Add new endpoints", IsCompleted = false }
                        }
                    },
                    new Backend.Models.Task
                    {
                        Id = 8,
                        Title = "Deploy to Staging",
                        Description = "Push latest build to staging environment",
                        DueDate = DateTime.Parse("2025-08-28"),
                        Priority = "high",
                        isCompleted = false,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 15, Title = "Build Docker image", IsCompleted = true },
                            new Subtask { Id = 16, Title = "Run smoke tests", IsCompleted = false }
                        }
                    }
                },

            ["2025-08-29"] = new List<Backend.Models.Task>
                {
                    new Backend.Models.Task
                    {
                        Id = 9,
                        Title = "Refactor Login Module",
                        Description = "Improve login code readability and maintainability",
                        DueDate = DateTime.Parse("2025-08-29"),
                        Priority = "medium",
                        isCompleted = false,
                        Progress = 0,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 17, Title = "Separate concerns", IsCompleted = false },
                            new Subtask { Id = 18, Title = "Add unit tests", IsCompleted = false }
                        }
                    },
                    new Backend.Models.Task
                    {
                        Id = 10,
                        Title = "Team Meeting",
                        Description = "Weekly team sync on project status",
                        DueDate = DateTime.Parse("2025-08-29"),
                        Priority = "low",
                        isCompleted = true,
                        Progress = 50,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Id = 19, Title = "Prepare slides", IsCompleted = true },
                            new Subtask { Id = 20, Title = "Share meeting notes", IsCompleted = false }
                        }
                    }
                }
        };



        //add a task to tasksByDate
        public void AddTask(Backend.Models.Task task)
        {
            // Assign unique ID by finding the current max ID in the dictionary
            //in a real world, we woudn't have to worry about unique id's as database would handle it!
            //the following is not an optimal solution but we will stick to it for now
            int newId = 1;
            if (_tasksByDate.Values.Any() && _tasksByDate.Values.SelectMany(tl => tl).Any())
            {
                newId = _tasksByDate.Values
                    .SelectMany(tl => tl)
                    .Max(t => t.Id) + 1;
            }
            task.Id = newId;

            // Initialize progress
            task.Progress = 0;

            // Use DateTime directly as key
            var dateKey = task.DueDate.ToString("yyyy-MM-dd");

            // Ensure key exists
            if (!_tasksByDate.ContainsKey(dateKey))
                _tasksByDate[dateKey] = new List<Backend.Models.Task>();

            // Add task
            _tasksByDate[dateKey].Add(task);
        }

        //get all tasks withinn a given time range!
        public Dictionary<string, List<Backend.Models.Task>> GetAllTasks(string from, string to)
        {
            Console.WriteLine($"from date:{from} to date: {to}");
            //convert date from string to datetime object
            DateTime fromDate = DateTime.ParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime toDate = DateTime.ParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            //resulting dictionary
            var result = _tasksByDate
                .Where(element =>
                {
                    //convert each key as we go, so we can compare our date range to the current element
                    DateTime keyDate = DateTime.ParseExact(element.Key, "yyyy-MM-dd", CultureInfo.InvariantCulture);

                    //return the key if it falls between the required range inclusive
                    return keyDate >= fromDate && keyDate <= toDate;
                })

                //convert the returned value into a 
                .ToDictionary(element => element.Key, element => element.Value);

            return result;
        }

        //complete a task using id
        public bool CompleteTask(int taskId)
        {
            //the following is not a very effecient way of finding the task, in a realworld setting, the database would handle finding the id for us!
            //here, we are using in memory storage so we will have to settle for this or change the data structure completely, which is not ideal right now
            Console.WriteLine("looking for task now!");
            foreach (var tasklist in _tasksByDate.Values)
            {
                var task = tasklist.FirstOrDefault(task => task.Id == taskId);
                if (task != null)
                {
                    task.isCompleted = true;
                    Console.WriteLine($"Task with id: ${taskId} is successfully marked as completed");
                    return true;
                }
            }
            Console.WriteLine("Failed marking task as completed!");
            return false;
        }

        public bool DeleteTask(int taskId)
        {
            Console.WriteLine("looking for task now!");
            foreach (var tasklist in _tasksByDate.Values)
            {
                var task = tasklist.FirstOrDefault(task => task.Id == taskId);
                if (task != null)
                {
                    //delete task
                    tasklist.Remove(task);
                    Console.WriteLine($"Task with ID {taskId} deleted successfully!");
                    return true;

                }
            }
            Console.WriteLine("Failed marking task as completed!");
            return false;
        }

        //the following marks subtasks as complete and also changes the progress data of its parent task!
        public bool CompleteSubtask(int taskId, int subtaskId)
        {
            Console.WriteLine("looking for task now!");
            foreach (var tasklist in _tasksByDate.Values)
            {
                //find the parent task
                var task = tasklist.FirstOrDefault(task => task.Id == taskId);
                if (task != null)
                {
                    //find the length of the subtassk array
                    int subtaskCount = task.Subtasks.Count;
                    //once subtask is completed, we will increase progress by progressPercentageIncrease
                    int progressPercentageIncrease = 100 / subtaskCount;

                    var subtask = task.Subtasks.FirstOrDefault(s => s.Id == subtaskId);
                    if (subtask != null)
                    {
                        subtask.IsCompleted = true;
                        //increase parent task progress
                        task.Progress += progressPercentageIncrease;
                        Console.WriteLine($"Subtask {subtaskId} marked as completed!");
                        return true;
                    }
                    else
                    {
                        Console.WriteLine($"Subtask {subtaskId} not found in task {taskId}.");
                        return false;
                    }
                }
            }
            Console.WriteLine("Failed marking task as completed!");
            return false;
        }
    }
}