import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { formatDistanceToNowStrict, isFuture } from 'date-fns';
import { interval, Subject, takeUntil, takeWhile } from 'rxjs';
import { Raffle } from 'src/app/core/models/Raffle.model';

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
export class RafflePreviewCardComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  @Input() raffle!: Raffle;
  @Output() onJoinRaffle = new EventEmitter<void>();

  readonly countdownString = signal('');

  ngOnInit() {
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        takeWhile(() => isFuture(this.raffle.expirationDate))
      )
      .subscribe(() => {
        this.countdownString.set(
          formatDistanceToNowStrict(this.raffle.expirationDate)
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onJoinRaffleClicked(event: MouseEvent) {
    event.stopPropagation();
    this.onJoinRaffle.emit();
  }
}
