import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { PageRoutes } from 'src/app/app.routes';
import { FormMode } from 'src/app/core/enums/FormMode.enum';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import * as routerSelectors from 'src/app/core/store/router/selectors/router.selectors';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UserProfileRoutes } from './user-profile.routes';

@Component({
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
    IsAsyncLoadingPipe,
    RouterOutlet,
  ],
})
export class UserProfilePage {
  private readonly store = inject(Store);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);
  readonly isEditMode$ = this.store
    .select(routerSelectors.selectUrl)
    .pipe(
      map((url) =>
        url.includes(`${PageRoutes.UserProfile}/${UserProfileRoutes.Edit}`)
      )
    );

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.UserProfile, FormMode.Edit],
      })
    );
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.UserProfile, UserProfileRoutes.View],
      })
    );
  }
}
