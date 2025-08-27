import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { rafflesActions } from 'src/app/core/store/raffles/actions/raffles.actions';
import { rafflesFeature } from 'src/app/core/store/raffles/feature/raffles.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { DistanceToNowPipe } from 'src/app/shared/pipes/distance-to-now/distance-to-now.pipe';

@Component({
  templateUrl: './raffle-detail-view.page.html',
  styleUrls: ['./raffle-detail-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BackButtonComponent,
    IonButton,
    IonCard,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonImg,
    IonContent,
    IonTitle,
    IonButtons,
    DistanceToNowPipe,
    PushPipe,
    IonSkeletonText,
    ToolbarTextButtonComponent,
  ],
})
export class RaffleDetailViewPage {
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);

  readonly raffleId = input.required<number>();

  readonly raffleResource = rxResource({
    request: () => ({ raffleId: this.raffleId() }),
    loader: ({ request }) => {
      this.store.dispatch(
        rafflesActions.fetchRaffle({ raffleId: request.raffleId })
      );
      return this.store
        .select(rafflesFeature.selectRaffleById(request.raffleId))
        .pipe(
          filter(
            (async) =>
              async?.status === AsyncDataStatus.Success ||
              async?.status === AsyncDataStatus.Error
          ),
          map((async) => async?.data)
        );
    },
  });

  readonly canUserEdit$ = toObservable(this.raffleId).pipe(
    switchMap((raffleId) =>
      this.store.select(userFeature.selectIsRaffleManager(raffleId))
    )
  );

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({ formAction: FormActionRoutes.Edit })
    );
  }

  onJoinRaffleClicked(raffle: Raffle) {
    this.modalService.openPaymentModal(raffle);
  }
}
