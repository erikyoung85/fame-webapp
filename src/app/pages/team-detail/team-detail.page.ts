import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
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
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { UserProfileAvatarComponent } from '../../shared/components/user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-team-detail-page',
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
    PushPipe,
    UserProfileAvatarComponent,
  ],
})
export class TeamDetailPage implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  @Input() set id(teamId: string) {
    const parsedId = parseInt(teamId, 10);
    this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: parsedId }));
  }
  readonly teamId = signal<number | undefined>(undefined);

  teamDetails$ = this.store
    .select(teamsFeature.selectTeamDetails)
    .pipe(map((async) => async.data));
  isLoading$ = this.store
    .select(teamsFeature.selectTeamDetails)
    .pipe(map((async) => async.loading));

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(teamsActions.clearTeamDetails());
  }
}
