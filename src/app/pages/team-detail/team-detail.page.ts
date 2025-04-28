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
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { TeamDetailComponent } from 'src/app/shared/components/team-detail/team-detail.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import safeParseInt from 'src/app/shared/utils/safeParseInt.util';

@Component({
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonProgressBar,
    IonBackButton,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
    TeamDetailComponent,
  ],
})
export class TeamDetailPage {
  private readonly store = inject(Store);

  private readonly _teamId = signal<number | undefined>(undefined);
  @Input() set teamId(value: string | number | undefined) {
    const parsedId = safeParseInt(value);
    this._teamId.set(parsedId);
  }

  readonly teamDetails$ = toObservable(this._teamId).pipe(
    filter((teamId) => teamId !== undefined),
    switchMap((teamId) => {
      this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: teamId }));
      return this.store.select(teamsFeature.selectTeamDetails(teamId));
    })
  );
}
