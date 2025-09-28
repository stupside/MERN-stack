# September 3, 2025

**03-express is based on the crash course at https://www.youtube.com/watch?v=CnH3kAXSrmU**

## Learning Steps

1. Created the project with a minimal hello world main file
2. Added a basic Express server with port configured from environment file
3. Added an Express HTTP server that returns "Hello" in response to requests
4. Added an about route that returns OS information as JSON
5. Added API route handler that returns the content of a file
6. Added static folder to Express to serve files from it directly
7. Added posts REST API with a getter to list posts
8. Added posts get by ID, delete by ID and create route handlers
9. Added limit as query parameter to the list posts endpoint
10. Used Express Router to clean up the main file
11. Enabled raw JSON body parsing
12. Added console log middleware
13. Added error handler middleware
14. Created and used HttpError extending Error for the error handler
15. Created and used catch-all handler
16. Improved logger middleware with colors
17. Moved handlers to controllers for better organization