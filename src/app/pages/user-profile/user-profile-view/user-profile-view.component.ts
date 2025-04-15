import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonLabel,
    IonItem,
    IonList,
    IonAvatar,
    IonNote,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    UnwrapAsyncPipe,
  ],
})
export class UserProfileViewComponent {
  private readonly store = inject(Store);

  readonly userProfile$ = this.store.select(userFeature.selectUserProfile);
}
