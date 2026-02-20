const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const { dbConnect } = require("./database/connectionManager.js");
const { app } = require("./server.js");

// DATABASE CONNECTION
dbConnect().then(() => {
    // EXPRESS SERVER ACTIVATION
  app.listen(PORT, HOST, () => {
    console.log("The server is running in port:" + PORT);
  });
});

