import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'toolbar-text-button',
  templateUrl: './toolbar-text-button.component.html',
  styleUrls: ['./toolbar-text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarTextButtonComponent {}
