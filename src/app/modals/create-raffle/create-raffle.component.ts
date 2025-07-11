import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addDays, formatISO, startOfTomorrow } from 'date-fns';
import { ModalDismissRole } from 'src/app/core/services/modal-service/modal.service';
import { CreateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/create-raffle.request.dto.v1';
import { rafflesActions } from 'src/app/core/store/raffles/actions/raffles.actions';
import { FormPhotoComponent } from 'src/app/shared/components/form-photo/form-photo.component';
import { validateRequiredFields } from 'src/app/shared/utils/validate-required-fields.util';

const MAX_RAFFLE_DURATION_DAYS = 30; // Maximum duration for a raffle in days

@Component({
  templateUrl: './create-raffle.component.html',
  styleUrls: ['./create-raffle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    IonInput,
    IonTextarea,
    ReactiveFormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonDatetime,
    IonModal,
    IonCardTitle,
    FormPhotoComponent,
  ],
})
export class CreateRaffleModalComponent {
  private readonly store = inject(Store);
  private readonly modalController = inject(ModalController);
  private readonly fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) athleteId!: number;

  protected readonly minStartDate = formatISO(new Date());
  protected readonly maxStartDate = formatISO(
    addDays(this.minStartDate, MAX_RAFFLE_DURATION_DAYS)
  );
  protected readonly minExpirationDate = formatISO(startOfTomorrow());
  protected readonly maxExpirationDate = formatISO(
    addDays(this.minExpirationDate, MAX_RAFFLE_DURATION_DAYS * 2)
  );

  readonly form = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    startDate: this.fb.control<string | undefined>(
      this.minStartDate,
      Validators.required
    ),
    endDate: this.fb.control<string | undefined>(
      this.minExpirationDate,
      Validators.required
    ),
    prizeThumbnailUrl: this.fb.control<string | undefined>(
      undefined,
      Validators.required
    ),
    prizeVideoUrl: this.fb.control<string | undefined>(
      undefined,
      Validators.required
    ),
  });

  onCancelClicked() {
    return this.modalController.dismiss(undefined, ModalDismissRole.Cancel);
  }

  onCreateClicked() {
    const formValues = this.form.getRawValue();
    if (
      this.form.invalid ||
      !validateRequiredFields(
        formValues,
        'title',
        'startDate',
        'endDate',
        'prizeThumbnailUrl',
        'prizeVideoUrl'
      )
    ) {
      this.form.markAllAsTouched();
      return;
    }

    const request: CreateRaffleRequestDtoV1 = {
      athletes_id: this.athleteId,
      title: formValues.title,
      description: formValues.description ?? null,
      start_date: formatISO(formValues.startDate),
      end_date: formatISO(formValues.endDate),
      prize_thumbnail: formValues.prizeThumbnailUrl,
      prize_video_url: formValues.prizeVideoUrl,
    };

    this.store.dispatch(rafflesActions.createRaffle({ request }));
  }
}
