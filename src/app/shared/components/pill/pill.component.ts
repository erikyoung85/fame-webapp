import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'shared-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonText, CommonModule],
})
export class PillComponent {
  readonly color = input<
    'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
  >('primary');

  readonly textColor = computed(
    () => `var(--ion-color-${this.color()}-contrast)`
  );
  readonly backgroundColor = computed(() => `var(--ion-color-${this.color()})`);
}
