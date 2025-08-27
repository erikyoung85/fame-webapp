import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-team-preview-card-loading',
  templateUrl: './team-preview-card-loading.component.html',
  styleUrls: ['./team-preview-card-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonSkeletonText,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class TeamPreviewCardLoadingComponent {}
