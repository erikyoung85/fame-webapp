import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonRippleEffect,
  IonRow,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, Subject, take, takeUntil, timer } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { Team } from 'src/app/core/models/Team.model';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';

@Component({
  templateUrl: './pick-team.component.html',
  styleUrls: ['./pick-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonRippleEffect,
    IonCardHeader,
    IonCard,
    IonImg,
    IonGrid,
    IonCol,
    IonRow,
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    PushPipe,
  ],
})
export class PickTeamModalComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private readonly store = inject(Store);
  private readonly modalController = inject(ModalController);

  @Output() onWillDismiss = () => null;

  readonly teams = this.store.select(teamsFeature.selectAll);
  readonly _selectedTeamId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.store.dispatch(teamsActions.fetchTeams());
    this.store
      .select(userFeature.selectUserProfile)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((async) => async.status === AsyncDataStatus.Success),
        take(1)
      )
      .subscribe((profile) =>
        this._selectedTeamId.set(profile.data?.favoriteTeamId)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.store.dispatch(
      userActions.patchUserProfile({
        request: { favorite_team_id: this._selectedTeamId() ?? null },
      })
    );
    return this.modalController.dismiss(this._selectedTeamId(), 'confirm');
  }

  selectTeam(team: Team) {
    if (this._selectedTeamId() === team.id) {
      timer(200)
        .pipe(take(1))
        .subscribe(() => {
          this._selectedTeamId.set(undefined);
        });
    } else {
      timer(100)
        .pipe(take(1))
        .subscribe(() => {
          this._selectedTeamId.set(team.id);
        });
    }
  }
}
