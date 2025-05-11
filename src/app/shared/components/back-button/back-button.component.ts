import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { ToolbarIconButtonComponent } from '../toolbar-icon-button/toolbar-icon-button.component';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarIconButtonComponent],
})
export class BackButtonComponent {
  private readonly navCtrl = inject(NavController);
  private readonly store = inject(Store);

  @Input({ transform: booleanAttribute }) noAction: boolean = false;
  @Input() defaultRoute?: string;

  async goBack() {
    if (this.noAction) {
      return;
    }

    const isSuccessful = await this.navCtrl.pop();
    if (!isSuccessful) {
      if (this.defaultRoute !== undefined) {
        this.store.dispatch(
          RouterActions.routeInCurrentTab({
            url: this.defaultRoute,
            direction: 'back',
          })
        );
      } else {
        // go to root page for the current tab
        console.warn(
          'No default route provided, going to root page for the current tab'
        );
        this.store.dispatch(
          RouterActions.routeInCurrentTab({
            url: '',
            direction: 'back',
          })
        );
      }
    }
  }
}
