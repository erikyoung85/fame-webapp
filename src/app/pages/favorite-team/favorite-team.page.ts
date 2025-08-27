import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { TabRoutes } from 'src/app/app.routes';
import { AsyncDataStatus, IsAsyncLoadingPipe } from 'src/app/core/async-data';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { TeamDetailViewComponent } from 'src/app/shared/components/team-detail/team-detail-view.component';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { ToolbarIconButtonComponent } from '../../shared/components/toolbar-icon-button/toolbar-icon-button.component';

@Component({
  templateUrl: './favorite-team.page.html',
  styleUrls: ['./favorite-team.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonButton,
    IonProgressBar,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
    PushPipe,
    TeamDetailViewComponent,
    ToolbarIconButtonComponent,
  ],
})
export class FavoriteTeamPage {
  private readonly store = inject(Store);
  private readonly tabsService = inject(TabsService);
  private readonly modalService = inject(ModalService);

  private readonly userProfile$ = this.store.select(
    userFeature.selectUserProfile
  );
  readonly teamDetails$ = this.store.select(teamsFeature.selectFavoriteTeam);
  readonly isUserLoggedIn$ = this.userProfile$.pipe(
    map((async) => async.data !== undefined)
  );

  readonly isLoading$ = combineLatest([
    this.teamDetails$,
    this.userProfile$,
  ]).pipe(
    map(([teamDetails, userProfile]) => {
      return (
        userProfile.status === AsyncDataStatus.Loading ||
        teamDetails.status === AsyncDataStatus.Loading
      );
    })
  );

  async openModal() {
    this.modalService.openPickTeam();
  }

  onLoginClicked() {
    this.tabsService.changeTab(TabRoutes.Account);
  }
}
