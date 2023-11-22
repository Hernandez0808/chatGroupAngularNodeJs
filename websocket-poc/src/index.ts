import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { User } from './classes/user';
import * as socket from './sockets/socket';



const PORT = 5000;
const app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// app.('Access-Control-Allow-Credentials', 'Content-Type');

io.on('connection', (client: any) => {
  io.emit('users-online', User.getUserList());
  io.emit('tds-msg', User.getMsgList());
  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.criarMsgDoUsuario(client, io);
  socket.removeUserOnline(client, io);
});

httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});