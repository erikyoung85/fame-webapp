import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { compareDesc } from 'date-fns';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { PillComponent } from 'src/app/shared/components/pill/pill.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { DistanceToNowPipe } from 'src/app/shared/pipes/distance-to-now/distance-to-now.pipe';

@Component({
  templateUrl: './user-profile-view.page.html',
  styleUrls: ['./user-profile-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonCardSubtitle,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    NgIf,
    IonListHeader,
    IonLabel,
    IonItem,
    IonList,
    IonNote,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    UserProfileAvatarComponent,
    PillComponent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonButtons,
    NgFor,
    ToolbarTextButtonComponent,
    IonButton,
    DistanceToNowPipe,
    PushPipe,
  ],
})
export class UserProfileViewPage implements OnInit {
  private readonly store = inject(Store);
  readonly LoadingStatus = AsyncDataStatus.Loading;

  readonly userProfile$ = this.store.selectSignal(
    userFeature.selectUserProfile
  );

  readonly enteredRafflesAsync$ = this.store.selectSignal(
    userFeature.selectEnteredRaffles
  );
  readonly isEnteredRafflesLoading$ = computed(() => {
    return this.enteredRafflesAsync$().status === AsyncDataStatus.Loading;
  });
  readonly enteredRafflesSorted$ = computed(() => {
    return [...this.enteredRafflesAsync$().data].sort((a, b) =>
      compareDesc(a.endDate, b.endDate)
    );
  });

  readonly managedAthletePages$ = this.store.selectSignal(
    userFeature.selectManagedAthletePages
  );

  readonly managedTeamPages$ = this.store.selectSignal(
    userFeature.selectManagedTeamPages
  );

  readonly managedRaffles$ = this.store.selectSignal(
    userFeature.selectManagedRaffles
  );
  readonly managedRafflesSorted$ = computed(() => {
    return [...this.managedRaffles$()].sort((a, b) =>
      compareDesc(a.endDate, b.endDate)
    );
  });

  ngOnInit(): void {
    this.store.dispatch(userActions.fetchUserEnteredRaffles());
  }

  fetchAllData() {
    this.store.dispatch(userActions.fetchUserEnteredRaffles());
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.fetchAllData();
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
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

  onRaffleClicked(raffleId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.RaffleDetail, raffleId],
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
