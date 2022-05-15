/* eslint-disable no-console */
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const { EVENTS, PORT } = require('./constant');
const { addUser, removeUser, getUsersInChannel } = require('./users');
const { addMessage, getMessagesInChannel } = require('./messages');

const app = express();
app.use(cors());

// create a server as line 17 expects a http server to be passed
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// socket connection starts
io.on(EVENTS.CONNECTION, (socket) => {
  console.log(`Connection with id: ${socket.id} starts.`);
  // join a channel for further conversation
  const { channelId, name } = socket.handshake.query;
  socket.join(channelId);

  const user = addUser(socket.id, channelId, name);
  io.in(channelId).emit(EVENTS.USER_JOINS, user);

  //  listen for new messages
  socket.on(EVENTS.NEW_MESSAGE, (data) => {
    const message = addMessage(channelId, data);
    io.in(channelId).emit(EVENTS.NEW_MESSAGE, message);
  });

  // disconnect and leave channel
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.in(channelId).emit(EVENTS.USER_LEAVES, user);
    socket.leave(channelId);
  });
});

app.get('/channels/:channelId/users', (req, res) => {
  const users = getUsersInChannel(req.params.channelId);
  return res.json({ users });
});

app.get('/rooms/:channelId/messages', (req, res) => {
  const messages = getMessagesInChannel(req.params.roomId);
  return res.json({ messages });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
