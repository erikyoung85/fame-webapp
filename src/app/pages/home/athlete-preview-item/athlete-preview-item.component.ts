import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonItem, IonLabel, IonNote, IonText } from '@ionic/angular/standalone';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { Athlete } from '../../models/athlete.model';

@Component({
  selector: 'app-athlete-preview-item',
  templateUrl: './athlete-preview-item.component.html',
  styleUrls: ['./athlete-preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonText, IonNote, IonLabel, IonItem, UserProfileAvatarComponent],
})
export class AthletePreviewItemComponent {
  @Input() athlete!: Athlete;
}
