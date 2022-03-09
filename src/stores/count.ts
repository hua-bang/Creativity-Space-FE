import { observable, action, computed, makeObservable } from 'mobx';

class CounterStore {
  constructor() {
    makeObservable(this);
  }

  @observable count = 0;

  @action
  increase() {
    this.count = this.count + 1;
  }

  @action
  decrease() {
    this.count = this.count - 1;
  }

  @action
  test(val: number) {
    this.count += val;
  }

  @computed
  get doubleCount() {
    return this.count * 2;
  }
}

export default CounterStore;
