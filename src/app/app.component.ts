import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { map } from 'rxjs';
import { AppRoutes } from './app.routes';
import { userActions } from './core/store/user/actions/user.actions';
import { userFeature } from './core/store/user/feature/user.feature';
import { UserProfileItemComponent } from './shared/components/user-profile-item/user-profile-item.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    IonItem,
    IonContent,
    IonIcon,
    IonSplitPane,
    IonLabel,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonList,
    IonMenuToggle,
    UserProfileItemComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ ...ionIcons });
  }

  readonly userProfile$ = this.store
    .select(userFeature.selectUserProfile)
    .pipe(map((async) => async.data));
  readonly isLoggedIn$ = this.store.select(userFeature.selectIsLoggedIn);

  public appPages = [
    { title: 'Home', url: AppRoutes.Home, icon: 'home-sharp' },
    { title: 'Login', url: AppRoutes.Login, icon: 'person-sharp' },
  ];

  ngOnInit(): void {
    this.store.dispatch(userActions.loadSession());
  }

  onUserProfileClicked() {
    this.router.navigate([AppRoutes.UserProfile]);
  }

  onLogoutClicked() {
    this.store.dispatch(userActions.logout());
  }
}
