import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { map } from 'rxjs';
import { userActions } from './core/store/user/actions/user.actions';
import { userFeature } from './core/store/user/feature/user.feature';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  constructor() {
    addIcons({ ...ionIcons });
  }

  readonly userProfile$ = this.store
    .select(userFeature.selectUserProfile)
    .pipe(map((async) => async.data));
  readonly isLoggedIn$ = this.store.select(userFeature.selectIsLoggedIn);

  ngOnInit(): void {
    this.store.dispatch(userActions.loadSession());
  }
}
