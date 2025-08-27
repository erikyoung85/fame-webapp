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
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { BackButtonComponent } from 'src/app/shared/components/back-button/back-button.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { RafflePreviewCardComponent } from '../../search/raffle-preview-card/raffle-preview-card.component';

@Component({
  templateUrl: './athlete-detail-view.page.html',
  styleUrls: ['./athlete-detail-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    PushPipe,
    RafflePreviewCardComponent,
    ToolbarTextButtonComponent,
  ],
})
export class AthleteDetailViewPage {
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService);

  readonly athleteId = input.required({ transform: numberAttribute });

  readonly athleteDetails$ = toObservable(this.athleteId).pipe(
    switchMap((athleteId) => {
      this.store.dispatch(
        athletesActions.fetchAthleteDetails({ athleteId: athleteId })
      );
      return this.store.select(athletesFeature.selectAthleteDetails(athleteId));
    })
  );

  readonly canUserEdit$ = toObservable(this.athleteId).pipe(
    switchMap((athleteId) =>
      this.store.select(userFeature.selectIsAthleteManager(athleteId))
    )
  );

  onCreateRaffleClicked() {
    this.modalService.openCreateRaffle(this.athleteId());
  }

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({
        formAction: FormActionRoutes.Edit,
      })
    );
  }
}
