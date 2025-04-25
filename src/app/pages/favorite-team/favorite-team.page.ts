import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
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
  ModalController,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { PickTeamModalComponent } from '../../modals/pick-team/pick-team.component';
import { UserProfileAvatarComponent } from '../../shared/components/user-profile-avatar/user-profile-avatar.component';

@Component({
  templateUrl: './favorite-team.page.html',
  styleUrls: ['./favorite-team.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonButton,
    IonNote,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
    IonListHeader,
    IonText,
    IonProgressBar,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UserProfileAvatarComponent,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
  ],
})
export class FavoriteTeamPage {
  private readonly store = inject(Store);
  private readonly modalController = inject(ModalController);

  private readonly userProfile$ = this.store.select(
    userFeature.selectUserProfile
  );
  readonly favoriteTeamId$ = this.userProfile$.pipe(
    map((profile) => profile?.data?.favoriteTeamId)
  );
  readonly teamDetails$ = this.favoriteTeamId$.pipe(
    switchMap((teamId) => {
      if (teamId === undefined) return of(undefined);

      this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: teamId }));
      return this.store.select(teamsFeature.selectTeamDetails(teamId));
    })
  );

  readonly isLoading$ = combineLatest([
    this.teamDetails$,
    this.userProfile$,
  ]).pipe(
    map(([teamDetails, userProfile]) => {
      return (
        userProfile.status === AsyncDataStatus.Loading ||
        teamDetails?.status === AsyncDataStatus.Loading
      );
    })
  );

  async openModal() {
    const modal = await this.modalController.create({
      component: PickTeamModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
