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
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    UserProfileAvatarComponent,
  ],
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
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
}
