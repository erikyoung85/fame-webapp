import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IonAvatar, IonItem, IonLabel } from '@ionic/angular/standalone';
import { UserProfile } from 'src/app/core/models/UserProfile.model';

@Component({
  selector: 'app-user-profile-item',
  templateUrl: './user-profile-item.component.html',
  styleUrls: ['./user-profile-item.component.scss'],
  imports: [IonLabel, IonAvatar, IonItem],
})
export class UserProfileItemComponent {
  @Input({ required: true }) userProfile!: UserProfile;
  @Input({ transform: booleanAttribute }) button: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  onUserProfileClicked() {
    if (this.button) {
      this.onClick.emit();
    }
  }
}
