
export class PendingUser {
  idUser: number;
  firstName: string;
  lastName: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}