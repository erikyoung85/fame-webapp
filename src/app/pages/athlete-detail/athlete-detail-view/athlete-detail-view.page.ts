import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  numberAttribute,
  OnInit,
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
  ModalController,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
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
export class AthleteDetailViewPage implements OnInit {
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

  readonly canUserEdit$ = this.store
    .select(userFeature.selectManagedAthletePages)
    .pipe(
      map((athletes) => {
        const athleteId = this.athleteId();
        return athletes.some((athlete) => athlete.id === athleteId);
      })
    );

  mockRaffles: Raffle[] = [
    {
      id: '0',
      name: 'Fake Raffle 1',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      sport: 'Basketball',
      team: 'University of Iowa',
      athlete: 'John Doe',
      favorited: true,
    },
    {
      id: '0',
      name: 'Fake Raffle 2',
      description: 'Lorem ipsum dolor sit amet.',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      sport: 'Basketball',
      team: 'University of Iowa',
      athlete: 'John Doe',
      favorited: true,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(userActions.fetchUserManagedPages());
  }

  onCreateRaffleClicked() {}

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [
          PageRoutes.AthleteDetail,
          this.athleteId(),
          FormActionRoutes.Edit,
        ],
        animated: false,
        replaceUrl: true,
      })
    );
  }

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
