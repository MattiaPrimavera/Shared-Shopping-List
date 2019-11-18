import { Injectable } from '@angular/core';

interface State {
  isAuth: boolean;
  uid: string;
  joinUserUid: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  state: State;

  constructor() {}

  getState(): State {
    return this.state;
  }

  setState(state: State) {
    this.state = state;
  }
}
