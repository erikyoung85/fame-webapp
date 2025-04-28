import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
import { UserProfileAvatarComponent } from '../user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  imports: [
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
    IonAvatar,
    IonImg,
    UserProfileAvatarComponent,
    NgFor,
  ],
})
export class TeamDetailComponent implements OnInit {
  @Input() teamDetails!: TeamDetail;

  ngOnInit() {}
}
