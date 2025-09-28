# September 3, 2025

**01-node is based on the crash course at https://www.youtube.com/watch?v=32M1al-Y6Ag**

## Learning Steps

1. Created the project with a minimal hello world main file
2. Added a Node.js HTTP server that returns "Hello" in response to requests
3. Added configurable PORT for the server that was hardcoded to be 3000
4. Instead of returning "Hello", the API now returns values from the request parameters
5. Added conditional responses in the HTTP server handler for minimal routing
6. Requesting `/` will load a static HTML file and return it to the client
7. Added an in-memory user store and a route to list all saved users
8. Added a logger middleware that console logs request properties
9. Cleanup by making request handlers modular
10. Added create user route and handler
11. Added get user by ID route handler
12. Added delete user by ID route handler

I then played around with OS, fs, crypto and other libraries from the Node.js standard library.