const express = require("express");
const socketIO = require("socket.io");
// const cors = require("cors");
const cache = require("memory-cache");
const path = require("path");

const server = express();

server.use(express.static(path.join(__dirname, "./dist/notification")));
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./dist/notification/index.html"));
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
    // console.log(socket.id);
    // console.log(socket);
    // socket.emit('test-event', 'This is some data');
    
    // Listen to client message: 
    socket.on("msg-from-client", msg => {
        
        console.log("Client message: " + msg);

        // Send that message to all clients: 
        socketServer.sockets.emit("msg-from-server", msg);
    });

    socket.on("status-from-client", status => {
        
        console.log("Client status: " + status);

        // Send that message to all clients: 
        cache.put("status", status, 1000 * 60 * 60 * 24, (key, value) => {
            console.log("Removing key: " + key + " with value: ", value);
        });

        socketServer.sockets.emit("status-from-server", status);

    });

    socket.on("arrived-from-client", arrived => {
        
        console.log(arrived);

        // Send that message to all clients: 

        socketServer.sockets.emit("arrived-from-server", arrived);

    });

    socket.on("time-from-client", time => {
        
        console.log("Client time: " + time);

        // Send that message to all clients: 
        cache.put("time", time, 1000 * 60 * 60 * 24, (key, value) => {
            console.log("Removing key: " + key + " with value: ", value);
        });

        socketServer.sockets.emit("time-from-server", time);

    });

    // Listen to client disconnect: 

    // socket.on("connect",()=>{
    //     console.log("connection success");
    // });

    // socket.on("connecting ",()=>{
    //     console.log("connecting");
    // });

    // socket.on("reconnect_failed",()=>{
    //     console.log("connection field");
    // });

    socket.on("disconnect", (reason) => {
        console.log("**************************************************************************************************");
        console.log("Client has been disconnected.");
        console.log(socket.id);
        console.log(reason);
    });

    // socket.on("error", ()=>{
    //     console.log("Error");
    // });

    // socket.on("Reconnect", ()=>{
    //     console.log("Reconnect");
    // });

    // socket.on("reconnecting", ()=>{
    //     console.log("reconnecting");
    // });

});


