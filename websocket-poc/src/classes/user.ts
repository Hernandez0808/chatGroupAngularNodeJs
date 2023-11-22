export class User {
    private static userList: { id: string; name: string }[] = [];
    private static msgList: { user:{ id: string; name: string }, msg: string, dt_emissao:string }[] = [];
  
    private constructor() {}
  
    public static getUserList() {
      return this.userList;
    }
    public static getMsgList() {
      return this.msgList;
    }
  
    public static addUser(user: any) {
      const added = this.userList.find((currentUser) => currentUser.id == user.id);
      if (added) {
        return;
      }
      this.userList.push(user);
    }
  
    public static removeUser(id: any) {
      if (this.userList) {
        this.userList = this.userList.filter((user) => user.id != id);
      }
    }
    public static addMsg(user_id: any, msg_user:string) {
      let user = this.userList.filter((user)=> user.id == user_id);
      let date = new Date();
      let objMsg = {user:user[0], msg:msg_user, dt_emissao:date.toString()}
      this.msgList.push(objMsg);
    }
  }