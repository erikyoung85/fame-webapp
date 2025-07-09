import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Team } from 'src/app/core/models/Team.model';

@Component({
  selector: 'app-team-preview-card',
  templateUrl: './team-preview-card.component.html',
  styleUrls: ['./team-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard],
})
export class TeamPreviewCardComponent {
  @Input() team!: Team;

  favorited = false;
}
