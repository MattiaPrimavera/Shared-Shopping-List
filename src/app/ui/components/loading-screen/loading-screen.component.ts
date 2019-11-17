import { LoadingScreenService } from '../../../services/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';
import { OnDestroy, OnInit, Component } from '@angular/core';

/**
 * Loading screen component and service: https://nezhar.com/blog/create-a-loading-screen-for-angular-apps/
 * Loader screen animation: https://codepen.io/meowwwls/pen/PBBzRL
 */

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
