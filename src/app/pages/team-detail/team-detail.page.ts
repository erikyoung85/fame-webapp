import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  IonBackButton,
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
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { UserProfileAvatarComponent } from '../../shared/components/user-profile-avatar/user-profile-avatar.component';

@Component({
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonNote,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
    IonListHeader,
    IonText,
    IonProgressBar,
    IonBackButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UserProfileAvatarComponent,
    UnwrapAsyncPipe,
  ],
})
export class TeamDetailPage {
  private readonly store = inject(Store);

  @Input() set id(teamId: string) {
    const parsedId = parseInt(teamId, 10);
    this.teamId.set(parsedId);
    this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: parsedId }));
  }

  readonly teamId = signal<number | undefined>(undefined);

  teamDetails$ = toObservable(this.teamId).pipe(
    filter((teamId) => teamId !== undefined),
    switchMap((teamId) =>
      this.store.select(teamsFeature.selectTeamDetails(teamId))
    )
  );
}
