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
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { AthletePreviewItemComponent } from './athlete-preview-item/athlete-preview-item.component';
import { RafflePreviewCardComponent } from './raffle-preview-card/raffle-preview-card.component';
import { TeamPreviewCardComponent } from './team-preview-card/team-preview-card.component';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonList,
    IonLabel,
    IonListHeader,
    IonButton,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    UnwrapAsyncPipe,
    TeamPreviewCardComponent,
    AthletePreviewItemComponent,
    RafflePreviewCardComponent,
  ],
})
export class HomePage implements OnInit {
  private readonly store = inject(Store);

  userProfile$ = this.store.select(userFeature.selectUserProfile);

  allTeams$ = this.store.select(teamsFeature.selectAll);
  isTeamsLoading$ = this.store.select(teamsFeature.selectIsLoading);

  allAthletes$ = this.store.select(athletesFeature.selectAll);
  isAthletesLoading$ = this.store.select(athletesFeature.selectIsLoading);

  ngOnInit(): void {
    this.store.dispatch(teamsActions.fetchTeams());
    this.store.dispatch(athletesActions.fetchAthletes());
  }

  mockRaffles: Raffle[] = [
    {
      id: '0',
      name: 'Fake Raffle 1',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      sport: 'Basketball',
      team: 'University of Iowa',
      athlete: 'John Doe',
      favorited: true,
    },
    {
      id: '0',
      name: 'Fake Raffle 2',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      sport: 'Basketball',
      team: 'University of Iowa',
      athlete: 'John Doe',
      favorited: true,
    },
  ];

  onTeamClicked(teamId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({ url: [PageRoutes.TeamDetail, teamId] })
    );
  }

  onSearchClicked() {}
}
