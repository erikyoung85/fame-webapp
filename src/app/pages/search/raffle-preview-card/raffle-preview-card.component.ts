import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
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
import { Store } from '@ngrx/store';
import { formatDistanceToNowStrict, isFuture } from 'date-fns';
import { interval, Subject, takeUntil, takeWhile } from 'rxjs';
import { PageRoutes } from 'src/app/app.routes';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';

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
  private readonly store = inject(Store);

  @Input({ required: true }) raffle!: Raffle;

  readonly countdownString = signal('');

  ngOnInit() {
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        takeWhile(() => isFuture(this.raffle.endDate))
      )
      .subscribe(() => {
        this.countdownString.set(
          formatDistanceToNowStrict(this.raffle.endDate)
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onJoinRaffleClicked(event: MouseEvent) {
    event.stopPropagation();

    this.modalService.openPaymentModal(this.raffle);
  }

  onRaffleClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.RaffleDetail, this.raffle.id],
      })
    );
  }
}
