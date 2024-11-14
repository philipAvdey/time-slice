# Time Slice

This project is a **Vite + ReactJS** application built with **TypeScript**, featuring a dynamic **doughnut chart** (using **Chart.js**) that visually represents how hours in a day are allocated to different tasks. Users can add, edit, complete, or delete tasks, with the total task hours always constrained to 24 hours per day. Any unallocated time is displayed as "Free Time" in the chart.

## Features
- **Add Tasks:** Create new tasks by specifying their duration (in hours).
- **Edit Tasks:** Modify existing tasks' details or durations.
- **Complete Tasks:** Mark tasks as complete and remove them from active tracking.
- **Delete Tasks:** Remove unwanted tasks from the list.
- **Dynamic Chart:** A doughnut chart dynamically adjusts to show how hours are distributed among tasks, with unallocated time represented as "Free Time."
- **24-Hour Limit:** Ensure the total hours of tasks do not exceed 24. (will implement week, month, years functionality)

## Tech Stack
- **Vite**
- **ReactJS**
- **TypeScript**
- **Chart.js**

## Usage

- **Add Tasks**: Use the input form to create tasks with a specific duration in hours.
- **Edit Tasks**: Click on any task in the list to edit its details.
- **Complete/Delete Tasks**: Use the respective buttons to mark a task as complete or delete it.
- The **doughnut chart** will update in real-time to reflect the changes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Todo

- Fix a bug where if a task is deleted, it messes up editing functionality
- Make the CSS prettier.
- Clean up the code, there are a few functions that can be more uniform/efficient
- Add clearer/more abundant comments
- Implement week/month/year functionality. Right now only works with 24 hours. 
