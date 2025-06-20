import { NgIf } from '@angular/common';
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
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import * as routerSelectors from 'src/app/core/store/router/selectors/router.selectors';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';

@Component({
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    PushPipe,
    NgIf,
    LetDirective,
  ],
})
export class UserProfilePage {
  private readonly store = inject(Store);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);
  readonly isEditMode$ = this.store
    .select(routerSelectors.selectUrl)
    .pipe(
      map((url) =>
        url.includes(`${PageRoutes.UserProfile}/${FormActionRoutes.Edit}`)
      )
    );

  onEditClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.UserProfile, FormActionRoutes.Edit],
        animated: false,
        replaceUrl: true,
      })
    );
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.UserProfile, FormActionRoutes.View],
        animated: false,
        replaceUrl: true,
      })
    );
  }
}
