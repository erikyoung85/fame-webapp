import { NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { UserProfileAvatarComponent } from '../user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  imports: [
    IonToolbar,
    IonHeader,
    IonNote,
    IonListHeader,
    IonLabel,
    IonItem,
    IonIcon,
    IonList,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    UserProfileAvatarComponent,
    NgFor,
  ],
})
export class TeamDetailComponent {
  private readonly store = inject(Store);

  @Input() teamDetails!: TeamDetail;

  onAthleteClicked(athlete: TeamDetail['rosterAthletes'][number]) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.AthleteDetail, athlete.id],
      })
    );
  }
}
