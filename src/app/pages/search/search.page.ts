import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { PageRoutes } from 'src/app/app.routes';
import { Raffle } from 'src/app/core/models/Raffle.model';
import {
  SearchItem,
  SearchItemType,
} from 'src/app/core/models/SearchItem.model';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { searchActions } from 'src/app/core/store/search/actions/search.actions';
import { searchFeature } from 'src/app/core/store/search/feature/search.feature';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UserProfileAvatarComponent } from '../../shared/components/user-profile-avatar/user-profile-avatar.component';
import { AthletePreviewItemComponent } from './athlete-preview-item/athlete-preview-item.component';
import { RafflePreviewCardComponent } from './raffle-preview-card/raffle-preview-card.component';
import { TeamPreviewCardComponent } from './team-preview-card/team-preview-card.component';

@Component({
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonProgressBar,
    IonNote,
    IonText,
    IonItem,
    IonSearchbar,
    IonList,
    IonLabel,
    IonListHeader,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonToolbar,
    IonHeader,
    CommonModule,
    TeamPreviewCardComponent,
    AthletePreviewItemComponent,
    RafflePreviewCardComponent,
    UserProfileAvatarComponent,
    ReactiveFormsModule,
    LetDirective,
    PushPipe,
    FormsModule,
  ],
})
export class SearchPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private readonly store = inject(Store);

  searchQueryControl = new FormControl<string>('', { nonNullable: true });
  isSearchFocused = signal(false);
  allSearchItems$ = this.store.select(searchFeature.selectAllSearchItems);
  isSearchLoading$ = this.store.select(searchFeature.selectAnyPagesLoading);

  userProfile$ = this.store.select(userFeature.selectUserProfile);
  isUserLoggedIn$ = this.store.select(userFeature.selectIsLoggedIn);

  allTeams$ = this.store.select(teamsFeature.selectAll);
  isTeamsLoading$ = this.store.select(teamsFeature.selectIsLoading);

  allAthletes$ = this.store.select(athletesFeature.selectAll);
  isAthletesLoading$ = this.store.select(athletesFeature.selectIsLoading);

  ngOnInit(): void {
    this.store.dispatch(teamsActions.fetchTeams());
    this.store.dispatch(athletesActions.fetchAthletes());

    this.searchQueryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(500))
      .subscribe((searchQuery) => {
        this.store.dispatch(
          searchActions.fetchGlobalSearch({
            searchQuery,
            paging: { page: 1, size: 10 },
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onSearchItemClicked(searchItem: SearchItem) {
    if (searchItem.type === SearchItemType.Team) {
      this.store.dispatch(
        RouterActions.routeInCurrentTab({
          url: [PageRoutes.TeamDetail, searchItem.id],
        })
      );
    }
    // else if (searchItem.type === SearchItemType.Athlete) {
    //   this.store.dispatch(
    //     RouterActions.routeInCurrentTab({
    //       url: [PageRoutes.AthleteDetail, searchItem.id],
    //     })
    //   );
    // }
  }
}
