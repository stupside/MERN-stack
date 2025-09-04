# Lappeenrannan teknillinen yliopisto

## Software Development Skills Full-stack, Online course

**Kilian Houpeurt**

# LEARNING DIARY, MERN STACK

---


## Date: 3 September 2025
**Activity:** Environment setup and Node.js Crash Course  
**Learning outcome:**
Today I started the MERN stack course by setting up my development environment and diving into the Node.js crash course at https://www.youtube.com/watch?v=32M1al-Y6Ag. I began with creating a simple hello world application and gradually built it into a fully functional HTTP server.

Initially, I created a basic server that just returned "Hello" to any request. Then i made the port configurable instead of hardcoding it to 3000, which taught me about environment variables in Node.js. I also used a typescript trick that allows me to properly type the process.env for better type safety. The next step was making the server more dynamic by returning values from request parameters rather than static responses.

As I progressed through the tutorial, I implemented basic routing by adding conditional responses for different URLs. One of the most important part was learning how it is possible to serve static HTML files. Because this helps understanding how web servers actually work behind the scenes.

I then built an in-memory user store and then created some CRUD operations for then user entity. I also added a logging middleware that prints request information to the console, which was really helpful for debugging.

By the end of this session, I had refactored my code into separate handler functions and created a complete user management API. 

I also spent some time to explore other Node.js standard libraries like OS, filesystem, and crypto modules to get a broader understanding of what Node.js offers.

## Date: 3 September 2025
**Activity:** MongoDB Crash Course  
**Learning outcome:**
I continued my learning journey with the MongoDB crash course from https://www.youtube.com/watch?v=2QQGWYe7IDU.

Starting with the MongoDB shell, I learned basic commands like showing databases and creating collections and the concept of documents instead of rows. I created a blog database and practiced inserting posts using both insertOne and insertMany methods.

The most interesting pas is probably learning about how easy querying is possible, and how complexe queries can be versus how they look in SQL. The find method is very powerful, and I experimented with different ways to filter data. The conditional queries using operators like $gt (greater than) and $lte (less than or equal) reminded me of SQL but with a different syntax.

I also learned about indexing, particularly text indexes, to better aggregate data and make filtering more efficient.

## Date: 3 September 2025
**Activity:** Express.js Crash Course  
**Learning outcome:**
I tackled the Express.js crash course from https://www.youtube.com/watch?v=CnH3kAXSrmU, building on the Node.js knowledge from the previous crash course, and also from i know about it already. And without any surprise, Express made creating web servers so much easier compared to the vanilla Node.js approach.

I started by recreating my previous server using Express, immediately noticing how much cleaner the code looked. Adding routes was straightforward, and I created an about page that returns system information as JSON. This helped me understand how to send different types of responses, including JSON, TEXT and HTML.

I moved on to building a proper REST API for posts, implementing all the CRUD operations I had learned about.

Learning about middleware was probably the most important part of this session. I implemented a logging middleware that prints colorful output to help with debugging. The error handling middleware using a custom HttpError class taught me proper error management in Express applications.

I also used Express Router to organize my code in a better way. It made the codebase much more maintainable by separating concerns. The idea is to keep controller as light as possible, and move the logic to self contained handlers. I also learned about body parsing for handling JSON requests, which is essential for modern APIs and is much more DX friendly compared to vanilla NodeJS server.

By the end of this session, I had created a well-structured Express application with proper middleware, error handling, and organized routes.

## Date: 3 September 2025
**Activity:** React Crash Course  
**Learning outcome:**
I completed the React crash course following the tutorial at https://www.youtube.com/watch?v=w7ejDZ8SWv8.

I started by creating a new React app using create-react-router, following the official React documentation. Seeing how React handles dynamic rendering of lists and how state changes trigger re-renders was fascinating. Implementing the delete functionality taught me about event handling and state management in React.

As a side note, the video was not up to date because CRA is deprecated so i had to figure how to use it.

Integrating with JSON Server was very cool as i did not knew this little tool. Data loading is done througt useEffects and calling the JSON server, but i later figured i could use the react-router in a better way by using page loaders for exemple.

This module tied together everything I had learned so far. I could see how the Node.js server, Express API, and React frontend could work together to create a complete web application.

## Date: 4 September 2025
**Activity** MERN Crash Course
**Learning outcome**

As the project will be built on the MERN Stack i have made the choice to create the project as i'm watching this crash course to practice directly on it.

# Course EP-1

Most of the things seen in this video are covered in the previous crashcourses. It includes setting up the express server, creating controllers, handlers, as well as creating basic middlewares like for logging and error handling. 

The only thing that stands out of the first video is how to connect the server to a mongdb server and how it handles collection interactions using schemas.

As a side note, i choosed to use Docker to host a Mongodb server in localhost.

# Course EP-2