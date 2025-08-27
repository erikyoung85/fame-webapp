import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-raffle-preview-card-loading',
  templateUrl: './raffle-preview-card-loading.component.html',
  styleUrls: ['./raffle-preview-card-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonSkeletonText,
    IonText,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class RafflePreviewCardLoadingComponent {}
