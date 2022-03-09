import { makeAutoObservable, observable, action } from 'mobx';
import { User } from '@/typings/user';

class UserStore {
  @observable isLogin = true;
  @observable userInfo: User | undefined = undefined; 
  @observable roles: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setUser(userInfo: User, roles: string[]) {
    this.isLogin = true;
    this.userInfo = userInfo;
    this.roles = roles;
  }

  @action
  setTest() {
    this.isLogin = false;
  }
}

export default UserStore;