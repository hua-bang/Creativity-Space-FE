import { makeAutoObservable } from 'mobx';

class UserStore {
  id = '';
  name = 'hug';

  constructor() {
    makeAutoObservable(this);
  }

  setName(value: string) {
    this.name = value;
  }
}

export default new UserStore();