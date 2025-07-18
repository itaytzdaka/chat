const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const cache = require("memory-cache");
const path = require("path");

const server = express();

server.use(cors());
server.use(express.static(path.join(__dirname, "./dist/notification")));
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./dist/notification/index.html"));
});

const port = process.env.PORT || 3000;
const listener = server.listen(port, () => console.log("Listening on port "+ port));
global.socketServer = socketIO(listener, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});


let chatMessages;
let connectionsCounter=0;






socketServer.on('connection', socket=>{
    console.log("**************************************************************************************************");
    console.log("Client has been connected.");

    if (!cache.get("chat-messages")) {
        chatMessages="";
    }
    else{
        chatMessages=cache.get("chat-messages");
    }

    connectionsCounter++;
    
    socketServer.sockets.emit("chat-messages-from-server", chatMessages);
    socketServer.sockets.emit("chat-sockets-from-server", connectionsCounter);

    // Listen to client message: 
    socket.on("msg-from-client", msg => {
            
        chatMessages+=msg;
        cache.put("chat-messages", chatMessages, 1000 * 60 * 60 * 24, (key, value) => {
            console.log("Removing key: " + key + " with value: ", value);
        });

        console.log("Client message: " + msg);

        // Send that message to all clients: 
        socketServer.sockets.emit("msg-from-server", msg);
    });


    socket.on("someone-is-typing-from-client", time => {

        socketServer.sockets.emit("someone-is-typing-from-server");
    });

    socket.on("someone-stopped-typing-from-client", time => {

        socketServer.sockets.emit("someone-stopped-typing-from-server");
    });


    socket.on("disconnect", (reason) => {
        console.log("**************************************************************************************************");
        console.log("Client has been disconnected.");
        connectionsCounter--;
        socketServer.sockets.emit("chat-sockets-from-server", connectionsCounter);
        console.log(socket.id);
        console.log(reason);
    });


});


