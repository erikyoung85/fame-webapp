import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  templateUrl: './athlete-detail.page.html',
  styleUrls: ['./athlete-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonNote,
    IonIcon,
    IonItem,
    IonList,
    IonListHeader,
    IonButton,
    IonLabel,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonProgressBar,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
    BackButtonComponent,
    UserProfileAvatarComponent,
  ],
})
export class AthleteDetailPage {
  private readonly store = inject(Store);
  private readonly modalController = inject(ModalController);

  readonly athleteId = input.required({ transform: numberAttribute });

  readonly athleteDetails$ = toObservable(this.athleteId).pipe(
    switchMap((athleteId) => {
      this.store.dispatch(
        athletesActions.fetchAthleteDetails({ athleteId: athleteId })
      );
      return this.store.select(athletesFeature.selectAthleteDetails(athleteId));
    })
  );

  async onPayClicked(athlete: AthleteDetail) {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: {
        athlete: athlete,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
}
