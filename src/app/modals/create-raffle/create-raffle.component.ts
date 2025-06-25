import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addDays, formatISO, startOfTomorrow } from 'date-fns';
import { Subject } from 'rxjs';
import { ModalDismissRole } from 'src/app/core/services/modal-service/modal.service';
import { CreateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/create-raffle.request.dto.v1';
import { rafflesActions } from 'src/app/core/store/raffles/actions/raffles.actions';
import { DatetimePickerComponent } from 'src/app/shared/components/datetime-picker/datetime-picker.component';
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
    IonList,
    IonListHeader,
    IonLabel,
    IonInput,
    IonItem,
    IonTextarea,
    ReactiveFormsModule,
    DatetimePickerComponent,
  ],
})
export class CreateRaffleModalComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private readonly store = inject(Store);
  private readonly modalController = inject(ModalController);
  private readonly fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) athleteId!: number;

  protected readonly minExpirationDate = formatISO(startOfTomorrow());
  protected readonly maxExpirationDate = formatISO(
    addDays(this.minExpirationDate, MAX_RAFFLE_DURATION_DAYS)
  );

  readonly form = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    prizeUrl: this.fb.control<string | undefined>(undefined),
    expirationDate: this.fb.control<string | undefined>(
      this.minExpirationDate,
      Validators.required
    ),
  });

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCancelClicked() {
    return this.modalController.dismiss(undefined, ModalDismissRole.Cancel);
  }

  onCreateClicked() {
    const formValues = this.form.getRawValue();
    if (
      this.form.invalid ||
      !validateRequiredFields(formValues, 'title', 'expirationDate')
    ) {
      this.form.markAllAsTouched();
      return;
    }

    const request: CreateRaffleRequestDtoV1 = {
      athletes_id: this.athleteId,
      title: formValues.title,
      description: formValues.description ?? null,
      start_date: formatISO(new Date()),
      end_date: formValues.expirationDate,
    };

    this.store.dispatch(rafflesActions.createRaffle({ request }));
  }
}
