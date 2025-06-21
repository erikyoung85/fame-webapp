import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
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
import { interval, Subject, takeUntil, takeWhile } from 'rxjs';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';

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
  private readonly modalService = inject(ModalService);

  @Input() raffle!: Raffle;
  @Output() onJoinRaffle = new EventEmitter<void>();

  countdownSeconds = signal(0);
  countdownString = signal('');

  ngOnInit() {
    this.countdownSeconds.set(
      Math.floor(
        Math.floor((this.raffle.endDate.getTime() - Date.now()) / 1000)
      )
    );

    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        takeWhile(() => this.countdownSeconds() > 0, true)
      )
      .subscribe(() => {
        this.countdownSeconds.update((seconds) => seconds - 1);
        this.countdownString.set(
          this.getDurationString(this.countdownSeconds())
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getDurationString(totalSeconds: number): string {
    if (totalSeconds <= 0) {
      return 'Cannot display a negative duration.';
    }

    let remaining = totalSeconds;

    const days = Math.floor(remaining / (24 * 60 * 60));
    if (days > 0) {
      return `${days} ${days > 1 ? 'days' : 'day'}`;
    }

    remaining %= 24 * 60 * 60;

    const hours = Math.floor(remaining / (60 * 60));
    remaining %= 60 * 60;

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  onJoinRaffleClicked(event: MouseEvent) {
    event.stopPropagation();
    this.onJoinRaffle.emit();
  }
}
