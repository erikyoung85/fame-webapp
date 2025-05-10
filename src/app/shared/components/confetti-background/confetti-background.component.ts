import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confetti-background',
  templateUrl: './confetti-background.component.html',
  styleUrls: ['./confetti-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ConfettiBackgroundComponent {}
