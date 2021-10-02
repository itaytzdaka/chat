const express = require("express");
const socketIO = require("socket.io");
// const cors = require("cors");
const cache = require("memory-cache");
const path = require("path");

const server = express();

server.use(express.static(path.join(__dirname, "./dist/chat")));
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./dist/chat/index.html"));
});

const port = process.env.PORT || 3000;
const listener = server.listen(port, () => console.log("Listening on port "+ port));
global.socketServer = socketIO(listener);

// server.use(cors({credentials: false, origin: true}));


// server.use(express.static(__dirname));
// server.use(cors({
//     origin: "http://localhost:4200",
//     credentials: true
// }));
// server.use(express.json());


//********************* */
// const server = require('http').Server(app);
// var io = require('socket.io')(server);

socketServer.on('connection', socket=>{
    console.log("**************************************************************************************************");
    console.log("Client has been connected.");

    // const chatMessages = cache.get("chat-messages");
    // socketServer.sockets.emit("chat-messages-from-server", chatMessages);

    // Listen to client message: 
    socket.on("msg-from-client", msg => {

        // chatMessages = cache.get("chat-messages");
        // chatMessages+=msg;
        
        console.log("Client message: " + msg);

        // Send that message to all clients: 
        socketServer.sockets.emit("msg-from-server", msg);
    });


    socket.on("time-from-client", time => {
        
        console.log("Client time: " + time);

        // Send that message to all clients: 
        cache.put("time", time, 1000 * 60 * 60 * 24, (key, value) => {
            console.log("Removing key: " + key + " with value: ", value);
        });

        socketServer.sockets.emit("time-from-server", time);

    });


    socket.on("disconnect", (reason) => {
        console.log("**************************************************************************************************");
        console.log("Client has been disconnected.");
        console.log(socket.id);
        console.log(reason);
    });


});


