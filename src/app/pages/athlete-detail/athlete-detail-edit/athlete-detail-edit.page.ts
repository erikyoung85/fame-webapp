import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonProgressBar,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { genderOptions } from 'src/app/core/constants/gender-options';
import { gradeOptions } from 'src/app/core/constants/grade-options';
import { Gender } from 'src/app/core/enums/Gender.enum';
import { Grade } from 'src/app/core/enums/Grade.enum';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { UpdateAthleteRequestDtoV1 } from 'src/app/core/services/athletes/dtos/requests/updateAthlete.request.dto.v1';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { validateRequiredFields } from 'src/app/shared/utils/validate-required-fields.util';

@Component({
  templateUrl: './athlete-detail-edit.page.html',
  styleUrls: ['./athlete-detail-edit.page.scss'],
  imports: [
    IonLabel,
    IonInput,
    IonIcon,
    IonItem,
    IonList,
    IonListHeader,
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
    IsAsyncLoadingPipe,
    UserProfileAvatarComponent,
    PushPipe,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
    DatePickerComponent,
    IonText,
    ToolbarTextButtonComponent,
  ],
})
export class AthleteDetailEditPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly modalService = inject(ModalService);
  private readonly cdRef = inject(ChangeDetectorRef);

  readonly athleteId = input.required({ transform: numberAttribute });

  readonly athleteDetails$ = toObservable(this.athleteId).pipe(
    switchMap((athleteId) => {
      this.store.dispatch(
        athletesActions.fetchAthleteDetails({ athleteId: athleteId })
      );
      return this.store.select(athletesFeature.selectAthleteDetails(athleteId));
    })
  );

  readonly gradeOptions = gradeOptions;
  readonly genderOptions = genderOptions;

  readonly form = this.fb.group({
    avatarUrl: this.fb.control<string | undefined>(undefined),
    firstName: '',
    lastName: '',
    grade: this.fb.control<Grade | undefined>(undefined, Validators.required),
    gender: this.fb.control<Gender | undefined>(undefined, Validators.required),
    hometown: '',
    dateOfBirth: this.fb.control<string | undefined>(undefined),
  });

  ngOnInit(): void {
    this.form.disable();

    this.athleteDetails$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((async) => async?.status === AsyncDataStatus.Success),
        take(1)
      )
      .subscribe((async) => {
        const athleteDetails = async?.data;
        if (athleteDetails === undefined) return;

        const formValues: ReturnType<typeof this.form.getRawValue> = {
          avatarUrl: athleteDetails.avatarUrl,
          firstName: athleteDetails.firstName,
          lastName: athleteDetails.lastName,
          grade: athleteDetails.grade,
          gender: athleteDetails.gender,
          dateOfBirth: athleteDetails.dateOfBirth,
          hometown: athleteDetails.hometown ?? '',
        };
        this.form.patchValue(formValues);
        this.form.enable();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async onHometownClicked() {
    const response = await this.modalService.openCityPicker();
    if (response !== undefined) {
      this.form.controls.hometown.setValue(
        `${response.city}, ${response.regionCode}`
      );
      this.cdRef.detectChanges();
    }
  }

  onSaveClicked() {
    const formValues = this.form.getRawValue();
    if (
      this.form.invalid ||
      !validateRequiredFields(formValues, 'gender', 'grade')
    ) {
      this.form.markAllAsTouched();
      return;
    }

    const request: UpdateAthleteRequestDtoV1 = {
      id: this.athleteId(),
      avatar_url: formValues.avatarUrl ?? null,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      gender: formValues.gender,
      grade: formValues.grade,
      date_of_birth: formValues.dateOfBirth ?? null,
      hometown: formValues.hometown ?? null,
    };

    this.store.dispatch(athletesActions.updateAthlete({ request }));
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [
          PageRoutes.AthleteDetail,
          this.athleteId(),
          FormActionRoutes.View,
        ],
        animated: false,
        replaceUrl: true,
      })
    );
  }
}
