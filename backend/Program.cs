var builder = WebApplication.CreateBuilder(args);


//add controllers here
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();


app.Run();

/*
/*const mockTasks: Task[]= [
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        dueDate: new Date("2025-08-25"),
        priority: "high",
        isCompleted: false,
        progress: 40,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
          { id: 5, title: "Subtask 5", isCompleted: false },
        ],
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        dueDate: new Date("2025-08-28"),
        priority: "medium",
        isCompleted: false,
        progress: 60,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description for Task 3",
        dueDate: new Date("2025-08-29"),
        priority: "low",
        isCompleted: false,
        progress: 33,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 4,
        title: "Task 4",
        description: "Description for Task 4",
        dueDate: new Date("2025-08-30"),
        priority: "high",
        isCompleted: false,
        progress: 50,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
        ],
      },
      {
        id: 5,
        title: "Task 5",
        description: "Description for Task 5",
        dueDate: new Date("2025-09-01"),
        priority: "medium",
        isCompleted: true,
        progress: 100,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: true },
        ],
      },
      {
        id: 6,
        title: "Task 6",
        description: "Description for Task 6",
        dueDate: new Date("2025-09-02"),
        priority: "low",
        isCompleted: false,
        progress: 25,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
        ],
      },
      {
        id: 7,
        title: "Task 7",
        description: "Description for Task 7",
        dueDate: new Date("2025-09-03"),
        priority: "high",
        isCompleted: false,
        progress: 20,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
          { id: 5, title: "Subtask 5", isCompleted: false },
        ],
      },
      {
        id: 8,
        title: "Task 8",
        description: "Description for Task 8",
        dueDate: new Date("2025-09-04"),
        priority: "medium",
        isCompleted: false,
        progress: 50,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
        ],
      },
      {
        id: 9,
        title: "Task 9",
        description: "Description for Task 9",
        dueDate: new Date("2025-09-05"),
        priority: "low",
        isCompleted: false,
        progress: 33,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 10,
        title: "Task 10",
        description: "Description for Task 10",
        dueDate: new Date("2025-09-06"),
        priority: "high",
        isCompleted: false,
        progress: 75,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: true },
          { id: 4, title: "Subtask 4", isCompleted: false },
        ],
      },
    ];

    return of(mockTasks); */
