import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-preview-card',
  templateUrl: './team-preview-card.component.html',
  styleUrls: ['./team-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonButton,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class TeamPreviewCardComponent {
  @Input() team!: Team;
}
