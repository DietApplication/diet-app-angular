
export class PendingUser {
  userId: number;
  firstName: string;
  lastName: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}