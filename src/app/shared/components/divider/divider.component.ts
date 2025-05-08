import { NgIf } from '@angular/common';
import {
  booleanAttribute,
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
  imports: [NgIf, IonText],
})
export class DividerComponent implements OnInit {
  @Input() text?: string;
  @Input({ transform: booleanAttribute }) vertical?: boolean = false;

  constructor() {}

  ngOnInit() {}
}
