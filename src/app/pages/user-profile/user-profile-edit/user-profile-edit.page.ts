import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';

@Component({
  templateUrl: './user-profile-edit.page.html',
  styleUrls: ['./user-profile-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    UserProfileAvatarComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    PushPipe,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IsAsyncLoadingPipe,
    IonProgressBar,
    IonChip,
    IonButtons,
    NgIf,
  ],
})
export class UserProfileEditPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);

  readonly form = this.fb.group({
    avatarUrl: this.fb.control<string | undefined>(undefined),
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    email: this.fb.control({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    // Load current user profile data into the form
    this.store
      .select(userFeature.selectUserProfile)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe((userProfile) => {
        if (userProfile.data !== undefined) {
          this.form.patchValue(userProfile.data);
        }
      });

    this.form.controls.avatarUrl.valueChanges.subscribe((value) => {
      console.log('Avatar source changed:', value);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUpdateUserProfileClicked() {
    if (this.form.invalid) {
      return;
    }

    this.store
      .select(userFeature.selectUserProfile)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe((userProfile) => {
        if (userProfile.data === undefined) {
          return;
        }

        const updatedUserProfile: UserProfile = {
          ...userProfile.data,
          ...this.form.value,
        };

        this.store.dispatch(
          userActions.updateUserProfile({ userProfile: updatedUserProfile })
        );
      });
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeToFormAction({
        formAction: FormActionRoutes.View,
      })
    );
  }
}
