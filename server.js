const express = require('express');
const app = express();
const http = require('http');

const path = require('path');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);
require('ejs');

app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});

//middleware and routing

app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});
app.use((req, res, next) => {
    res.status(500).send("Something Broke! :(");
});

io.on('connection', (socket) => {
    console.log(`Socket:${socket.id} connected`);
    
    socket.on('disconnect', () => {
        console.log(`Socket:${socket.id} disconnected`)
    });
});

server.listen(port, () => {
    console.log(`listening on port*: ${port}`);
});