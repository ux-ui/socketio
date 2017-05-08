'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser';

import path from 'path';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

let users = [];
let sockets = {};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../scoketio-frontend/public/')));

io.on('connection', (socket) => {
    let nick = socket.handshake.query.nick;
    let currentUser = {
        id: socket.id,
        nick: nick
    };

    socket.on('ding', () => {
        socket.emit('dong', {data: 'aaaaa'});
    });

    socket.on('disconnect', () => {
        console.log('[INFO] User ' + currentUser.nick + ' disconnected!');
        socket.broadcast.emit('userDisconnect', {nick: currentUser.nick});
    });
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});