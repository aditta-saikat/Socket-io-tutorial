const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const port = 3000;

const {Server} = require("socket.io");
const io = new Server(expressServer);




app.get('/',  (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const nps = io.of("/home");
nps.on('connection', (socket) =>{
    nps.emit('message', 'Hello, you are connected to the Home server!');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("Myevent" , (msg) =>{
        console.log(msg);
    })

  /* setInterval(()=>{
        let d = new Date();
        let t = d.getTime()
        socket.emit("Myevent" ,t);
    }, 20000); */

    /*setTimeout(() =>{
        socket.send("Server-->Client(connection).")
    }, 10000) */

    socket.emit('message', 'Hello, you are connected to the server!');

   // socket.on('clientMessage', (message) => {
   //     console.log('Received message from client:', message);
   // });

    //socket.on('serverBroadcast', (message) => {
   //     io.emit('message', message); 
  //  });

    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    }); 
});





expressServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
