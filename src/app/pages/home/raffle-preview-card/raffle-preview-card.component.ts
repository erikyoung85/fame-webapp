import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from '@ionic/angular/standalone';
import { Raffle } from '../../models/raffle.model';

@Component({
  selector: 'app-raffle-preview-card',
  templateUrl: './raffle-preview-card.component.html',
  styleUrls: ['./raffle-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonText,
    IonButton,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class RafflePreviewCardComponent implements OnInit {
  @Input() raffle!: Raffle;

  countdownSeconds = signal(0);
  countdownString = signal('');

  ngOnInit() {
    this.countdownSeconds.set(
      Math.floor((this.raffle.endDate.getTime() - Date.now()) / 1000)
    );
    setInterval(() => {
      this.countdownSeconds.update((seconds) => seconds - 1);
      this.countdownString.set(this.getDurationString(this.countdownSeconds()));
    }, 1000);
  }

  getDurationString(totalSeconds: number): string {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    if (days > 0) {
      return `${days} days`;
    }

    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds - seconds) / 60) % 60;
    const hours = Math.floor((totalSeconds - seconds - minutes * 60) / 60) % 24;
    return `${hours}:${minutes}:${seconds}`;
  }
}
