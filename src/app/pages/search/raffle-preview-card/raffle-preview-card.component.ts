import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { DistanceToNowPipe } from 'src/app/shared/pipes/distance-to-now/distance-to-now.pipe';

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
    DistanceToNowPipe,
    PushPipe,
  ],
})
export class RafflePreviewCardComponent {
  private readonly modalService = inject(ModalService);
  private readonly store = inject(Store);

  @Input({ required: true }) raffle!: Raffle;

  onJoinRaffleClicked(event: MouseEvent, raffle: Raffle) {
    event.stopPropagation();

    this.modalService.openPaymentModal(raffle);
  }

  onRaffleClicked(raffle: Raffle) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.RaffleDetail, raffle.id],
      })
    );
  }
}
