import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonSearchbar,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import { debounceTime, map, Subject, takeUntil } from 'rxjs';
import { PageRoutes } from 'src/app/app.routes';
import {
  SearchItem,
  SearchItemType,
} from 'src/app/core/models/SearchItem.model';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { rafflesActions } from 'src/app/core/store/raffles/actions/raffles.actions';
import { rafflesFeature } from 'src/app/core/store/raffles/feature/raffles.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { searchActions } from 'src/app/core/store/search/actions/search.actions';
import { searchFeature } from 'src/app/core/store/search/feature/search.feature';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UserProfileAvatarComponent } from '../../shared/components/user-profile-avatar/user-profile-avatar.component';
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
    IonContent,
    IonToolbar,
    IonHeader,
    CommonModule,
    TeamPreviewCardComponent,
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

  readonly searchQueryControl = new FormControl<string>('', {
    nonNullable: true,
  });
  readonly allSearchItems$ = this.store.select(
    searchFeature.selectAllSearchItems
  );
  readonly isSearchLoading$ = this.store.select(
    searchFeature.selectAnyPagesLoading
  );

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);

  readonly allTeams$ = this.store.select(teamsFeature.selectAll);
  readonly isTeamsLoading$ = this.store.select(teamsFeature.selectIsLoading);

  readonly allAthletes$ = this.store.select(athletesFeature.selectAll);
  readonly isAthletesLoading$ = this.store.select(
    athletesFeature.selectIsLoading
  );

  readonly allRaffles$ = this.store
    .select(rafflesFeature.selectAllRaffles)
    .pipe(
      map((raffleAsyncs) =>
        raffleAsyncs.map((async) => async?.data).filter(isNotNil)
      )
    );

  ngOnInit(): void {
    this.store.dispatch(teamsActions.fetchTeams());
    this.store.dispatch(athletesActions.fetchAthletes());
    this.store.dispatch(
      rafflesActions.fetchRafflesForAthlete({ athleteId: 1 })
    );

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

  onTeamClicked(teamId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({ url: [PageRoutes.TeamDetail, teamId] })
    );
  }

  onAthleteClicked(athleteId: number) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.AthleteDetail, athleteId],
      })
    );
  }

  onSearchItemClicked(searchItem: SearchItem) {
    if (searchItem.type === SearchItemType.Team) {
      this.store.dispatch(
        RouterActions.routeInCurrentTab({
          url: [PageRoutes.TeamDetail, searchItem.id],
        })
      );
    } else if (searchItem.type === SearchItemType.Athlete) {
      this.store.dispatch(
        RouterActions.routeInCurrentTab({
          url: [PageRoutes.AthleteDetail, searchItem.id],
        })
      );
    }
  }
}
