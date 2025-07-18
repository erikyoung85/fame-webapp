import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  constructor() {
    addIcons({ ...ionIcons });
  }

  ngOnInit(): void {
    Keyboard.setResizeMode({ mode: KeyboardResize.None });
    Keyboard.setAccessoryBarVisible({ isVisible: true });
  }
}
