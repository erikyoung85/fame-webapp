import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { PillComponent } from 'src/app/shared/components/pill/pill.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  templateUrl: './user-profile-view.page.html',
  styleUrls: ['./user-profile-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    IonListHeader,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonNote,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    UnwrapAsyncPipe,
    UserProfileAvatarComponent,
    LetDirective,
    PillComponent,
    PushPipe,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IsAsyncLoadingPipe,
    IonProgressBar,
    IonChip,
    IonButtons,
    NgFor,
  ],
})
export class UserProfileViewPage implements OnInit {
  private readonly store = inject(Store);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);

  readonly managedAthletePages$ = this.store.select(
    userFeature.selectManagedAthletePages
  );

  readonly managedTeamPages$ = this.store.select(
    userFeature.selectManagedTeamPages
  );

  readonly managedRaffles$ = this.store.select(
    userFeature.selectManagedRaffles
  );

  ngOnInit(): void {
    this.store.dispatch(userActions.fetchUserManagedPages());
  }

  onTeamClicked(teamId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.TeamDetail, teamId],
      })
    );
  }

  onAthleteClicked(athleteId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.AthleteDetail, athleteId],
      })
    );
  }

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({
        formAction: FormActionRoutes.Edit,
      })
    );
  }

  onLogoutClicked() {
    this.store.dispatch(userActions.logout());
  }
}
