# Task List App
A simple task management application with Angular for the front end and .NET for the backend. Users can add, view, and filter tasks as well as mark them as completed!

## Features:
- Add tasks with title, description, and priority.
- Filter tasks by date range and priority.
- Mark tasks as completed.
- Tasks are grouped by date for easy viewing.
- Responsive UI built with Angular standalone components.

## Technologies
- Frontend: Angular, TypeScript, HTML, CSS
- Backend: .NET, C#
- Data: In-memory storage for tasks (no database required)

## Setup:
### Backend:
1- cd backend

2- dotnet restore

3- dotnet run

### Frontend:
1- cd frontend
2- npm install
3- ng serve
4- open http://localhost:4200 on your browser


## Testing:
I currently have a full time job so I didn't manage to do any unit testing or integration testing.
The only testing I managed to do was manual testing to make sure all features work!

## Notes:
1- Backend uses in-memory storage; tasks will reset on server restart.

2- Frontend communicates with backend via HTTP requests to manage tasks dynamically.
