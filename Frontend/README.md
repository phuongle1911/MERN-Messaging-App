
## MESSAGE APP (MERN Project)

This project a **frontend** that provides user register, log in, profile management, connections, user and real time chats. 
Is built for a MERN (MongoDB, Express, React, NodeJS) based Message app.
 
-----------------------------------------------
### Overview

The app allows users to:
- Register and log in
- Connect with other users.
- Unfriend with existing friends
- View other user profile
- Send message to friends and chat in real time using Socket.IO
- Upload and update images for profiles using Multer


-----------------------------------------------
### **Dependent Software and Packages**
-----------------------------------------------
| Technology | Fuction | License | Alternatives 
|------------|---------|---------| ----------| 
|**React/ React-router**| a Javascript library for building user interfaces (UIs). It allows developers to create reusable and interactive UI components that manage their own state and render the UI efficiently by updating only the necessary parts of the page. | MIT | Vue.js, Svelte, Angular |
|**Vite**| a frontend build tool that provides a fast development experience and builds optimized static assets for production | MIT | Parcel, Rspack, Turbopack, esbuild, Rollup, Webpack.
|**Axios**| a JavaScript library used for making HTTP request to external servers | MIT | FetchAPI, NextClient
|**Socket.IO**| Enables real time chats with a communication between users and the server | MIT | Websocket API, Pusher |
|**Mongoose**| Give structure and validation for MongoDB data simplifing data modeling| MIT | MySQL, PostgreSQL |
|**Multer**| For profile pictures and simpler file and media handling| MIT | Formidable, Busboy |
|**Vitest**| for testing and simulating functions for Vite build tool| MIT |  Jest, mocha |



#### React/ react-router
React and React Router are chosen for this messaging app because they provide a flexible, component-driven architecture and an efficient way to handle dynamic, real-time UI updates—both essential for messaging features like live chat interfaces. React’s virtual DOM and state management patterns make it easy to update only the parts of the UI that change, improving performance and developer productivity. React Router adds clean, predictable navigation for pages like login, chats, and profiles. While Vue.js and Svelte are excellent frameworks, React has a far larger ecosystem, more mature third-party libraries, and more common in industry. Angular is powerful but heavier and more opinionated, introducing unnecessary complexity for a lightweight, fast-moving messaging project. React’s simplicity, flexibility, and ecosystem support make it the more suitable choice.

#### Vite
Vite is chosen for this messaging app because it offers an extremely fast development experience and efficient build process, which is ideal for an application that will be iterated on frequently. Its instant server start, lightning-fast hot module replacement, and optimized production build pipeline let developers test UI updates, routing changes, and real-time messaging features without slow reloads or build times. Compared to traditional bundlers or older tooling like Webpack, Vite is lighter, simpler to configure, and built with modern JavaScript tooling in mind. While alternatives like Parcel, Snowpack, or Create React App can work, they are generally slower, less efficient with large projects, or less actively maintained. Vite’s speed, modern architecture, and excellent compatibility with React make it the most suitable choice for building a responsive, scalable messaging app.

#### MongoDB and Mongoose
For our project database we used MongoDB(NoSQL) connected through the object data modelling library Mongoose, that simplifies data handling in Node. MongoDB stores data in a free schema and scalable data management way in form of flexible JSON files making it perfect for aplications where user profiles and their messages can have different structures. With Mongoose we could implement schemas, validations and relationships.
MongoDB offers better performance for dynamic and realtime data models and operations, because of that we choosed this technology and not others like PostgreSQL or MySQL.

#### Axios
Axios is chosen for making HTTP requests to API server in this messaging app because it simplifies API communication with a clean, consistent syntax and built-in features that make handling authenticated requests, interceptors, and error responses much smoother. For a messaging app that frequently communicates with backend endpoints—login, fetching conversations, sending messages—Axios provides automatic JSON parsing, request cancellation support, and easy configuration of headers, which is especially helpful when working with file upload feature. While the native Fetch API works, it requires more manual handling of errors, timeouts, and repetitive setup, making code harder to maintain. Compared to NextClient (Next.js server-side client utilities), Axios is framework-agnostic, more flexible, and better suited for a standalone React app without requiring a Next.js environment. Overall, Axios’s simplicity, reliability, and developer-friendly design make it a more suitable choice for managing API communication in this messaging app.

#### Socket.io
Socket.io is chosen for this messaging app because it provides a reliable, high-level real-time communication layer that handles all the complexities developers normally face when dealing with live chat features. It automatically manages reconnection, heartbeats, fallback transports, room/channels support, and event-based messaging—things that raw WebSocket API requires you to build manually. This makes real-time features like message delivery, typing indicators, and online/offline status far easier and more stable. It also has simple syntax and their documentation is easy to understand. 
Compared to the native WebSocket API, which is low-level and lacks built-in reconnection or structured events, Socket.io dramatically reduces development time and edge-case bugs. While services like Pusher offer real-time capabilities, they introduce ongoing subscription costs, require vendor lock-in, and provide less control over backend logic. Socket.io is free, open-source, fully self-hosted, and integrates seamlessly with Node.js/Express, making it the most suitable and cost-effective choice for building a scalable, real-time messaging app.

#### Vitest
Vitest is chosen for this messaging app because it integrates seamlessly with Vite, offering a testing environment that matches the app’s actual development setup for faster, more accurate test execution. Vitest provides lightning-fast test runs, built-in mocking, and instant hot reloading—mirroring Vite’s performance advantages. Compared to Jest, which is powerful but slower and requires additional configuration to work smoothly with Vite projects, Vitest feels simpler and more native. Mocha, while flexible, requires more manual setup for assertions, mocking, and DOM simulation, making it less convenient for testing modern frontend apps. Vitest delivers a faster, more consistent, and more developer-friendly testing experience, making it the most suitable choice for a Vite-powered messaging app.


#### Multer
Is used to manage file uploads in the application, primarily for profile images and chat media. Defines destination paths and naming conventions for stored files. There are alternatives like Formidable or Busboy but they require more manual setup, Multer's is efficient and easy to use.

**ALL DEPENDENCIES USED ARE LICENSED UNDER THE MIT LICENSE, WITH AND OPEN-SOURCE NATURE AND INDUSTRY RELEVANCE**


---------------------

### INSTALLATION GUIDE

#### Hardware and System Requirements
To run this application you need minimal hardware. A 64-bit operation system (MacOS, Windows10 or Linux) with a at least 4gb of RAM to run React, Node.Js and MongoDB in comftable way, and a stable internet connection to support local server execution and Websocket communication. Plus a minimun of 2gb storage for dependencies and database storage.
React, Node.JS (v18 or later recommended), it's package manager (npm) and MongoDB must be installed.


--------------------------
#### 1 - Install Node.JS
You'll need to have homebrew installed in your system for mac and linux and input:
    
    brew install node
in your terminal. For windows you can use WSL to install homebrew or download directly from the node offical website (link: https://nodejs.org/es) this is the easiest way.

After the installation is completed.

    node -v npm -v
To check the version and confirm it's been installed succesfully.

-------------------------
#### 2 - Install MongoDB and Create Database
For MongoDB you can user a cloud database with MongoDB Atlas or if you wish to install it locally you can download it from the MongoDB official website (link:https://www.mongodb.com/try/download/community).

Create database as per instruction in /Backend/README.md

-------------------------
#### 3 - Cloning the Repository to your local system
Open the terminal and run:

    git clone https://github.com/phuongle1911/MERN-Messaging-App

Once you have a local copy of the project. navigate into the project directory to install the packages and dependencies.

Navigate to frontend project directory:

  cd Frontend/message_app/project

Navigate to backend project directory:

  cd Backend
-------------------------
#### 4 - Install Packages and Dependencies

In the project directory of frontend and backedn, run this in terminal: 
    
    npm install

This will automatically download and install all the necessary packages and create a node_modules folder in your directory. 

--------------------------

#### 5 - Environment Configuration
Database connection and authentification requires environment variables configuration. 
In Backend folder, create a file named '.env' in the project root directory and then you can copy this:

    VITE_PORT=5173

---------------------------
#### 6 - Run Application
After all the prevoius steps are finished, the app is ready to start. 

In both frontend and backend directory terminal, run the below:
    
    npm run dev

To access the app, with auto reaload on changes. The app can be accessed via link provided by vite, usually will be: (link:http://localhost:5173)

To cancel the connection, enter "Ctrl+C" on Window, or "Command+C" on MacOS.
   
To run Vitest in frontend, at frontend directory terminal, run:
   
    npm test
   
To run the Jest test for testing of different features the app has to offer.

If MongoDB is running locally, ensure it is active before launching the server.

To ensure MondoDB is connected correctly, Access (link: http://localhost:3000/databaseHealth) in the browser or a tool like Postman or Insomnia. This returns a JSON file that contains the connection status, database name and host details.  



---------------------
### Programming style
The frontend project used Airbnb React style guide (link: https://github.com/airbnb/javascript/tree/master/react). The style guide describes the general React code style.

Please follow this style guide when you contribute to the project. This ensure code readbility and ensure coding style consistent. Thank you for your support!


-----------------------
### Contributors:
* Phuong(link:https://github.com/phuongle1911)
* Jack(link:https://github.com/x99y)
* Max(link:https://github.com/maxmoeller-147)
