import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import * as CSS from 'csstype';

@Component({
  selector: 'toolbar-icon-button',
  templateUrl: './toolbar-icon-button.component.html',
  styleUrls: ['./toolbar-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, IonIcon],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarIconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() fill: 'outline' | 'solid' | 'clear' = 'solid';
  @Input() shape: 'round' | 'square' = 'round';
  @Input() iconStyle?: CSS.Properties;
}
