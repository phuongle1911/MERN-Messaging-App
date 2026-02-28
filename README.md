This is a messaging app, having following features:
- Register user, log in
- edit user profile
- connect the other users
- message other users

### INSTALLATION GUIDE

#### Hardware and System Requirements
To run this application you need minimal hardware. A 64-bit operation system (MacOS, Windows10 or Linux) with a at least 4gb of RAM to run React, Node.Js and MongoDB, and a stable internet connection to support local server execution and Websocket communication. Plus a minimun of 2gb storage for dependencies and database storage.
React, Node.JS (v18 or later recommended), it's package manager (npm) and MongoDB must be installed.


--------------------------
#### 1 - Install Node.JS
You'll need to have homebrew installed in your system for mac and linux and input:
    
    brew install node
in your terminal. For windows you can use WSL to install homebrew or download directly from the node offical website (link: https://nodejs.org/es) this is the easiest way.

After the installation is completed.

    node -v 
    npm -v
To check the version and confirm it's been installed succesfully.

-------------------------
#### 2 - Install MongoDB and Create Database
For MongoDB you can user a cloud database with MongoDB Atlas or if you wish to install it locally you can download it from the MongoDB official website (link:https://www.mongodb.com/try/download/community).

-------------------------
#### 3 - Cloning the Repository to your local system
Open the terminal and run:

    git clone https://github.com/phuongle1911/MERN-Messaging-App

Once you have a local copy of the project. navigate into the project directory to install the packages and dependencies.

Navigate to frontend project directory:

  cd Frontend/

Navigate to backend project directory:

  cd Backend
-------------------------
#### 4 - Install Packages and Dependencies

In the project directory of frontend and backend, run this in terminal: 
    
    npm install

This will automatically download and install all the necessary packages and create a node_modules folder in your directory. 

--------------------------

#### 5 - Environment Configuration
Database connection and authentification requires environment variables configuration. 
In Frontend folder, create a file named '.env' in the directory and then you can copy this:

    VITE_PORT=5173

In Backend folder, create a file named '.env', copy and modify the below to configuration of your choice:
  NODE_ENV=development
  PORT=3000
  DB_NAME='yourDatabaseName'
  DB_USER='yourDbUser'
  DB_PASSWORD='password'
  AUTH_SOURCE='yourAuthorisationDatabase' <!-- this is optional if you create user inside a database -->
  MONGODB_HOST='127.0.0.1'
  JWT_SECRET=your_secret_key

---------------------------
#### 6 - Run Application
After all the prevoius steps are finished, the app is ready to start. 

In both frontend and backend directory terminal, run the below:
    
    npm run dev

To access the app, with auto reaload on changes. The app can be accessed via link provided by vite, usually will be: (link:http://localhost:5173)

To cancel the connection, enter "Ctrl+C" on Window, or "Command+C" on MacOS.
   
To run test for frontend and backend, in respective directory terminal, run:
   
    npm test
   

If MongoDB is running locally, ensure it is active before launching the server.

To ensure MondoDB is connected correctly, Access (link: http://localhost:3000/databaseHealth) in the browser or a tool like Postman or Insomnia. This returns a JSON file that contains the connection status, database name and host details.  
