import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { IsAsyncLoadingPipe } from 'src/app/core/async-data';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { TeamDetailViewComponent } from 'src/app/shared/components/team-detail/team-detail-view.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  templateUrl: './team-detail-view.page.html',
  styleUrls: ['./team-detail-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonProgressBar,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
    TeamDetailViewComponent,
    BackButtonComponent,
    ToolbarTextButtonComponent,
    PushPipe,
  ],
})
export class TeamDetailViewPage {
  private readonly store = inject(Store);

  readonly teamId = input.required({ transform: numberAttribute });

  readonly teamDetails$ = toObservable(this.teamId).pipe(
    filter((teamId) => teamId !== undefined),
    switchMap((teamId) => {
      this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: teamId }));
      return this.store.select(teamsFeature.selectTeamDetails(teamId));
    })
  );

  readonly canUserEdit$ = toObservable(this.teamId).pipe(
    switchMap((teamId) =>
      this.store.select(userFeature.selectIsTeamManager(teamId))
    )
  );

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({
        formAction: FormActionRoutes.Edit,
      })
    );
  }
}
