import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { formatISO, isAfter, startOfTomorrow } from 'date-fns';
import { isNotNil } from 'ramda';
import { filter, map, Subject, take, takeUntil } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/async-data';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { rafflesActions } from 'src/app/core/store/raffles/actions/raffles.actions';
import { rafflesFeature } from 'src/app/core/store/raffles/feature/raffles.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import {
  FilePickerFile,
  FilePickerFileType,
  FormFilePickerComponent,
} from 'src/app/shared/components/form-file-picker/form-file-picker.component';
import { FormPhotoComponent } from 'src/app/shared/components/form-photo/form-photo.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { validateRequiredFields } from 'src/app/shared/utils/validate-required-fields.util';

@Component({
  templateUrl: './raffle-detail-edit.page.html',
  styleUrls: ['./raffle-detail-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonTitle,
    IonButtons,
    ToolbarTextButtonComponent,
    ReactiveFormsModule,
    IonDatetime,
    IonModal,
    FormPhotoComponent,
    IonInput,
    IonTextarea,
    FormFilePickerComponent,
  ],
})
export class RaffleDetailEditPage implements OnInit, OnDestroy {
  protected readonly FilePickerFileType = FilePickerFileType;
  private readonly unsubscribe$ = new Subject<void>();
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly raffleId = input.required<string>();
  raffle: Raffle | undefined = undefined;

  readonly form = this.fb.group({
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>('', Validators.required),
    startDate: this.fb.control<string>(
      formatISO(new Date()),
      Validators.required
    ),
    endDate: this.fb.control<string>(
      formatISO(startOfTomorrow()),
      Validators.required
    ),
    prizeThumbnail: this.fb.control<string | undefined>(
      undefined,
      Validators.required
    ),
    prizeVideo: this.fb.control<FilePickerFile | undefined>(
      undefined,
      Validators.required
    ),
  });

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.form.disable();

    this.store.dispatch(
      rafflesActions.fetchRaffle({ raffleId: this.raffleId() })
    );

    this.store
      .select(rafflesFeature.selectRaffleById(this.raffleId()))
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((async) => async?.status === AsyncDataStatus.Success),
        map((async) => async?.data),
        filter(isNotNil),
        take(1)
      )
      .subscribe((raffle) => {
        this.raffle = raffle;
        this.form.patchValue({
          ...raffle,
          startDate: formatISO(raffle.startDate),
          endDate: formatISO(raffle.endDate),
        });
        this.form.enable();
      });
  }

  onSaveClicked() {
    const formValue = this.form.getRawValue();

    if (
      this.raffle === undefined ||
      this.form.invalid ||
      !validateRequiredFields(formValue, 'prizeVideo', 'prizeThumbnail')
    ) {
      this.form.markAllAsTouched();
      console.error('Form is invalid', formValue);
      return;
    }

    const now = new Date();
    const isStarted = isAfter(now, formValue.startDate);
    const isEnded = isAfter(now, formValue.endDate);
    const isActive = isStarted && !isEnded;
    const newRaffle: Raffle = {
      id: this.raffle.id,
      athlete: this.raffle.athlete,
      teamName: this.raffle.teamName,
      sport: this.raffle.sport,
      favorited: this.raffle.favorited,
      title: formValue.title,
      description: formValue.description,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      isStarted: isStarted,
      isEnded: isEnded,
      isActive: isActive,
      prizeThumbnail: formValue.prizeThumbnail,
      prizeVideo: formValue.prizeVideo,
    };

    this.store.dispatch(
      rafflesActions.updateRaffle({
        request: newRaffle,
      })
    );
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({ formAction: FormActionRoutes.View })
    );
  }
}
