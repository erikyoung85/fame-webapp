import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from '@ionic/angular/standalone';
import { Athlete } from '../../models/athlete.model';

@Component({
  selector: 'app-athlete-preview-item',
  templateUrl: './athlete-preview-item.component.html',
  styleUrls: ['./athlete-preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonText, IonNote, IonLabel, IonItem, IonAvatar],
})
export class AthletePreviewItemComponent {
  @Input() athlete!: Athlete;
}
