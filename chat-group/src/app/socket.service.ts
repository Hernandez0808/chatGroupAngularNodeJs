import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
// import { Message } from 'src/model/message.model';
// import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  emitUser(user: any): void {
    this.socket.emit('add-user', user);
  }
  emitExit(): void {
    this.socket.emit('exit');
  }
  getClientId(): Observable<string> {
    return this.socket.fromEvent('user-id');
  }
  getUsersOnline(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('users-online');
  }

  
  getMensagens(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('tds-msg');
  }
  addMsgUser(msgDoUsuario:string){
    this.socket.emit('emite-msg', msgDoUsuario);
  }

}