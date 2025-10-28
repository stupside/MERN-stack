# Lappeenranta Teknillinen Yliopisto

## Software Development Skills Full-stack, Online Course

**Kilian Houpeurt**

# LEARNING DIARY - MERN STACK

More information about the diary can be found in the following directories:
- `01-node`
- `02-mongo`
- `03-express`
- `04-react`
- `05-mern`

In those folders, you will find a README.md explaining what I have learned and what I have done, as well as the materials produced during the tutorials.

---

## Date: September 3, 2025
**Activity:** Environment setup and Node.js Crash Course
**Learning outcome:**

Today I started the MERN stack course by setting up my development environment and diving into the Node.js crash course at https://www.youtube.com/watch?v=32M1al-Y6Ag. I began with creating a simple hello world application and gradually built it into a fully functional HTTP server.

Initially, I created a basic server that just returned "Hello" to any request. Then I made the port configurable instead of hardcoding it to 3000, which taught me about environment variables in Node.js. I also used a TypeScript trick that allows me to properly type the process.env for better type safety. The next step was making the server more dynamic by returning values from request parameters rather than static responses.

As I progressed through the tutorial, I implemented basic routing by adding conditional responses for different URLs. One of the most important parts was learning how it is possible to serve static HTML files, because this helps understand how web servers actually work behind the scenes.

I then built an in-memory user store and created some CRUD operations for the user entity. I also added a logging middleware that prints request information to the console, which was really helpful for debugging.

By the end of this session, I had refactored my code into separate handler functions and created a complete user management API.

I also spent some time exploring other Node.js standard libraries like OS, filesystem, and crypto modules to get a broader understanding of what Node.js offers.

## Date: September 3, 2025
**Activity:** MongoDB Crash Course
**Learning outcome:**

I continued my learning journey with the MongoDB crash course from https://www.youtube.com/watch?v=2QQGWYe7IDU.

Starting with the MongoDB shell, I learned basic commands like showing databases and creating collections and the concept of documents instead of rows. I created a blog database and practiced inserting posts using both insertOne and insertMany methods.

The most interesting part is probably learning about how easy querying is possible, and how complex queries can be versus how they look in SQL. The find method is very powerful, and I experimented with different ways to filter data. The conditional queries using operators like $gt (greater than) and $lte (less than or equal) reminded me of SQL but with a different syntax.

I also learned about indexing, particularly text indexes, to better aggregate data and make filtering more efficient.

## Date: September 3, 2025
**Activity:** Express.js Crash Course
**Learning outcome:**

I tackled the Express.js crash course from https://www.youtube.com/watch?v=CnH3kAXSrmU, building on the Node.js knowledge from the previous crash course, and also from what I already know about it. Without any surprise, Express made creating web servers so much easier compared to the vanilla Node.js approach.

I started by recreating my previous server using Express, immediately noticing how much cleaner the code looked. Adding routes was straightforward, and I created an about page that returns system information as JSON. This helped me understand how to send different types of responses, including JSON, TEXT and HTML.

I moved on to building a proper REST API for posts, implementing all the CRUD operations I had learned about.

Learning about middleware was probably the most important part of this session. I implemented a logging middleware that prints colorful output to help with debugging. The error handling middleware using a custom HttpError class taught me proper error management in Express applications.

I also used Express Router to organize my code in a better way. It made the codebase much more maintainable by separating concerns. The idea is to keep controllers as light as possible, and move the logic to self-contained handlers. I also learned about body parsing for handling JSON requests, which is essential for modern APIs and is much more developer-friendly compared to vanilla Node.js server.

By the end of this session, I had created a well-structured Express application with proper middleware, error handling, and organized routes.

## Date: September 3, 2025
**Activity:** React Crash Course
**Learning outcome:**

I completed the React crash course following the tutorial at https://www.youtube.com/watch?v=w7ejDZ8SWv8.

I started by creating a new React app using create-react-router, following the official React documentation. Seeing how React handles dynamic rendering of lists and how state changes trigger re-renders was fascinating. Implementing the delete functionality taught me about event handling and state management in React.

As a side note, the video was not up to date because CRA is deprecated, so I had to figure out how to use it.

Integrating with JSON Server was very cool as I didn't know this little tool. Data loading is done through useEffects and calling the JSON server, but I later figured I could use react-router in a better way by using page loaders for example.

This module tied together everything I had learned so far. I could see how the Node.js server, Express API, and React frontend could work together to create a complete web application.

## Date: September 4-5, 2025
**Activity:** MERN Crash Course
**Learning outcome:**

As the project will be built on the MERN Stack, I made the choice to create the project as I'm watching this crash course to practice directly on it.

### Course EP-1 (September 4)

Most of the things seen in this video are covered in the previous crash courses. It includes setting up the express server, creating controllers, handlers, as well as creating basic middlewares like for logging and error handling.

The only thing that stands out from the first video is how to connect the server to a MongoDB server and how it handles collection interactions using schemas.

As a side note, I chose to use Docker to host a MongoDB server in localhost instead of using the service used in the videos.

### Course EP-2 (September 4)

This crash course episode is dedicated to protecting the API routes of the express server. I followed the course to apply the elements directly to the project. First I added user routes to allow users to register into the app, and later login and get a JWT token from it. The JWT payload only includes the user's id and name and has a validity of 7 days.

I will use this mechanism to protect parties so only allowed people can actually interact with the party they are invited to. To do so I followed the instructions to create an auth middleware that is in charge of verifying the JWT token before the requests are handled, and then extract the token payload so later on I can access the current user's information such as their id. I added the JWT payload to the express request and used some TypeScript sugar to extend express Request type. After adding the auth middleware to the routers, I can finally get the user's information.

I also added some validations using the zod library.

### Course EP-3 (September 5)

This crash course is about calling the backend we made during EP-2 from the frontend. I used this course to help me build my project using React. I will bootstrap the project with Next.js.

One of the first steps was to know what pages I would like to have in my application, and get a better idea of what the UX would look like. Basically the project will allow users to select a movie from a movie list, and then start a party. The party is shared to another user. The video player is in sync between every user. This allows people to watch movies together.

This crash course helped me understand how React works but also the popular library Redux. To store the auth token, instead of storing it in the localStorage, I will use Next.js actions, and use the token on server side only and store it securely in an encrypted cookie.

I also had to prepare the frontend to be able to call my API. I wanted the body schemas and responses to be accessible from the frontend for better input validation and type safety. To do so, I used yarn's workspace to make a shared package in libraries/api. I will use this package in both my frontend and my backend. After that I was able to call my backend and started implementing the frontend.

To have a better idea of how the frontend could look like, I decided to draw a little mockup on Excalidraw.

### Course EP-4 (September 5-6)

This video is highly focused on using redux toolkit to interact with our backend. I did not use Redux in the project but I directly used the native fetch API and learned Next.js server-side rendering and actions.

## September 6-11, 2025

I worked on the project full-time to make it work as intended. I played a lot with React and Next.js and I loved it. I also had to make some adjustments to the backend, for example adding routes, connecting the backend to TMDB to get movie information. The commit history follows the real progress of my work.

## September 11-28, 2025

I worked a lot on the backend and implemented SSE to send live events to the users connected to the website and also some utilities to help me in my journey (type validation automation, etc.). I used ZOD for schema validation and kept the API type-safe. I implemented all the parts of both the frontend and the backend.

I did a lot of refactoring during this time as the project grew bigger and bigger.

At the end of this period I had a working prototype of my project:

- User can login/register
- User can create a party
- User can join a party with a code
- User can leave a party
- User can delete a party
- User can search movies within a party
- User can add movies to the watchlist
- User can remove movies from the watchlist
- User can play a movie within a party
- Users that are in a party have their player in sync
  - Users watching the movie will appear in the UI
  - The owner can play and pause the movie → it will play/pause the movie for others
  - User can see if a movie is played by the owner

## October 27, 2025

Before the submition of the project i have added validation feedback for form fields in the frontend as well as user feedback when a 4xx error is returned by the server. Errors are already returned by the server, but were not handled on client side.