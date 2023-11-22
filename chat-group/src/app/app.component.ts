import { Component } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users$: Observable<any[]> | undefined;
  mensagens$: Observable<any[]> | undefined;
  userName: string = "";
  name: string = "";
  msg: string = "";
  isOnline: boolean = false;
  title:string="teste_socket"
  clienteId = "";
  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.users$ = this.socket
      .getClientId()
      .pipe(
        concatMap((clientId) =>{
          this.clienteId = clientId;
          return this.socket
          .getUsersOnline()
        }
            // .pipe(map((users: any) => (users = users.filter((u:any) => u.id !== clientId)))
            //apresenta todos os usuarios que tem um id diferente ao seu
        // )
        ));  
    this.mensagens$ = this.socket.getMensagens().pipe();
  }
  ngAfterViewInit(): void{
}
  
  join() {
    if (!this.name) {
      return;
    }
    this.socket.emitUser({
      id: null,
      name: this.name,
    });
    this.desceAteUltimaMsg();
    this.focusNoInput();
    
    this.userName = this.name;
    this.name = '';
    this.isOnline = true;
  }
  criarMsg() {
    if (!this.msg) {
      return;
    }
    this.socket.addMsgUser(this.msg);
    this.msg = "";
    this.desceAteUltimaMsg();
    this.focusNoInput();


  }
  exit() {
    this.socket.emitExit();
    this.isOnline = false;
  }
  desceAteUltimaMsg(){
    this.mensagens$?.subscribe((lstMsgs:any[])=>{
      let id_ultima_msg = "msg-" + (lstMsgs.length - 1);
      setTimeout(() => {
        document.getElementById(id_ultima_msg)?.scrollIntoView();
      });
    });
  }
  focusNoInput(){
    setTimeout(() => {
      let textarea = document.getElementById("text-area") as HTMLInputElement
      textarea.focus();
    });
  }
}
