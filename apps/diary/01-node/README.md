# 3 September 2025

**01-node is based on the crash course at https://www.youtube.com/watch?v=32M1al-Y6Ag**

1. Created the project with a minimal hello world main file.
2. Added a node http server that returns Hello in response to requests.
3. Added configurable PORT of the server that was hardcoded to be 3000.
4. Instead of returning Hello the API now returns values from the req param.
5. Added conditional responses in the http server handler for minimal routing.
6. Requesting / will load a static html and return it to the client.
7. Add an inmemory user store and a route to list all users saved.
8. Add a logger middleware that console logs req properties.
9. Cleanup by making request handlers.
10. Add create user route and handler.
11. Add get user from id route handler.