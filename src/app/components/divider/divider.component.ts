import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'shared-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonText, CommonModule],
})
export class DividerComponent implements OnInit {
  @Input() height: number = 1;
  @Input() text?: string;

  constructor() {}

  ngOnInit() {}
}
