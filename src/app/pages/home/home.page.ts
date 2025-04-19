import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { Athlete } from '../models/athlete.model';
import { Raffle } from '../models/raffle.model';
import { Team } from '../models/team.model';
import { AthletePreviewItemComponent } from './athlete-preview-item/athlete-preview-item.component';
import { RafflePreviewCardComponent } from './raffle-preview-card/raffle-preview-card.component';
import { TeamPreviewCardComponent } from './team-preview-card/team-preview-card.component';

@Component({
  selector: 'app-home-page',
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
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    CommonModule,
    UnwrapAsyncPipe,
    TeamPreviewCardComponent,
    AthletePreviewItemComponent,
    RafflePreviewCardComponent,
  ],
})
export class HomePage {
  private readonly store = inject(Store);

  userProfile$ = this.store.select(userFeature.selectUserProfile);

  mockRaffles: Raffle[] = [
    {
      id: '0',
      name: 'Raffle 1',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      sport: 'Basketball',
      team: 'University of Iowa',
      athlete: 'John Doe',
      favorited: true,
    },
  ];

  mockTeams: Team[] = [
    {
      id: '0',
      name: `University of Iowa`,
      sport: 'Basketball',
      logoUrl: '',
      description: 'Lorem ipsum dolor sit amet.',
      favorited: true,
    },
    {
      id: '1',
      name: `University of Iowa`,
      sport: 'Football',
      logoUrl: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      favorited: false,
    },
    {
      id: '2',
      name: `University of Iowa`,
      sport: 'Soccer',
      logoUrl: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      favorited: false,
    },
    {
      id: '3',
      name: `University of Iowa`,
      sport: 'Lacrosse',
      logoUrl: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      favorited: false,
    },
    {
      id: '4',
      name: `University of Iowa`,
      sport: 'Swimming',
      logoUrl: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      favorited: false,
    },
  ];

  mockAthletes: Athlete[] = [
    {
      id: '0',
      name: 'John Doe',
      sport: 'Basketball',
      team: 'University of Iowa',
      profilePictureUrl: undefined,
      position: 'Point Guard',
      jerseyNumber: '23',
      favorited: true,
    },
    {
      id: '1',
      name: 'John Doe',
      sport: 'Basketball',
      team: 'University of Iowa',
      profilePictureUrl: undefined,
      position: 'Point Guard',
      jerseyNumber: '23',
      favorited: false,
    },
    {
      id: '2',
      name: 'John Doe',
      sport: 'Basketball',
      team: 'University of Iowa',
      profilePictureUrl: undefined,
      position: 'Point Guard',
      jerseyNumber: '23',
      favorited: false,
    },
    {
      id: '3',
      name: 'John Doe',
      sport: 'Basketball',
      team: 'University of Iowa',
      profilePictureUrl: '',
      position: 'Point Guard',
      jerseyNumber: '23',
      favorited: false,
    },
  ];
}
