# AI Usage Documentation

Generative AI was used during development of this project as a coding assistant and planning tool.

## How AI Was Used

AI was used to help with:

- Breaking the project into smaller development steps
- Debugging JavaScript, Express, and SQLite errors
- Explaining how frontend forms communicate with backend routes
- Helping design the resume preview and print workflow
- Reviewing code for naming mismatches and route errors
- Helping build selection controls for choosing which resume items to include
- Wording comments for sections of code in index.html, server.js, app.js, and db.js

## Where AI Was Used in the Application

AI assistance was used in the development of:

- Express route structure
- SQLite table setup
- Resume preview generation
- Resume item selection checkboxes
- Gemini API suggestion route
- Documentation files
- Branding/icon setup
- Library attribution popup

## Gemini API Feature

The application allows the user to save their own Gemini API key locally. The key is used to send a job responsibility/detail to Gemini and return a suggested improved resume bullet point.

The prompt asks Gemini to improve the resume bullet point while keeping it professional, concise, and action-focused.

The user can review the suggested bullet before saving it to the resume data.

## Important Notes

No API key is included in the submitted project files.

The `.env` file and SQLite database file are ignored by Git using `.gitignore`.

Any AI-generated code used in this project was reviewed and tested during development.