import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { PillComponent } from 'src/app/shared/components/pill/pill.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonListHeader,
    IonButton,
    CommonModule,
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
  ],
})
export class UserProfileViewComponent implements OnInit {
  private readonly store = inject(Store);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);

  readonly managedAthletePages$ = this.store.select(
    userFeature.selectManagedAthletePages
  );

  readonly managedTeamPages$ = this.store.select(
    userFeature.selectManagedTeamPages
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

  onLogoutClicked() {
    this.store.dispatch(userActions.logout());
  }
}
