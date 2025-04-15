import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import {
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppRoutes } from 'src/app/app.routes';
import { FormMode } from 'src/app/core/enums/FormMode.enum';
import * as routerSelectors from 'src/app/core/store/router/selectors/router.selectors';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UserProfileRoutes } from './user-profile.routes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonChip,
    IonTitle,
    IonProgressBar,
    FormsModule,
    ReactiveFormsModule,
    IonButtons,
    IonContent,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    IsAsyncLoadingPipe,
    RouterOutlet,
  ],
})
export class UserProfilePage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);
  readonly isEditMode$ = this.store
    .select(routerSelectors.selectUrl)
    .pipe(
      map((url) => url.includes(`${AppRoutes.UserProfile}/${FormMode.Edit}`))
    );

  onEditClicked() {
    this.router.navigate([AppRoutes.UserProfile, UserProfileRoutes.Edit]);
  }

  onCancelClicked() {
    this.router.navigate([AppRoutes.UserProfile, UserProfileRoutes.View]);
  }
}
