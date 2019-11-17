import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private isLoading = false;
  loadingStatus = new Subject<boolean>();

  get loading(): boolean {
    return this.isLoading;
  }

  set loading(value) {
    this.isLoading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
