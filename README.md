## Notes App
This is a web application powered by React, Redux, and TypeScript that enables users to manage their notes with ease.

### Functionality
- Users can **add**, **edit**, and **remove** notes.
- Notes are showcased in a table format with details like time of creation, note content, note category, and dates mentioned in the note.
- Categories available: **Task**, **Random Thought**, and **Idea**.
- Provides functionality to **archive** notes. These notes won't be visible in the primary list.
- Archived notes can be viewed and unarchived when necessary.
- A dynamic summary table showcases the note count according to categories. It categorizes them separately for active and archived notes.
- Live updates to the summary table are made as users interact with their notes.

### Data Storage
Even though the application uses Redux for state management and provides an illusion of data persistence, it uses a predefined dataset of 7 notes. It doesn't interact with any backend or actual database; data will not be reset upon page reload.

### Technologies Used
- **React** for UI components
- **Redux** with **@reduxjs/toolkit** for state management
- **Redux-persist** to maintain state
- **React-hook-form** for form handling
- **React-modal** for modals
- **Reselect** for selector functions
- **Vite** for building and serving the application
- **TypeScript** for static type checking

### How to Run the Application
1. Clone the repository to your machine.
2. Run `npm install` to install all dependencies.
3. Use `npm run dev` to start the development server.
4. The application should launch in your default web browser.
