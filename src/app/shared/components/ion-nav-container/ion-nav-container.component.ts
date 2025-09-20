import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  Type,
  ViewChild,
} from '@angular/core';
import { IonNav } from '@ionic/angular/standalone';

@Component({
  selector: 'ion-nav-container',
  templateUrl: './ion-nav-container.component.html',
  styleUrls: ['./ion-nav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonNav],
})
export class IonNavContainerComponent<T> implements AfterViewInit {
  @Input({ required: true }) rootComponent!: Type<T>;
  @Input() rootParams?: Partial<T>;

  @ViewChild('nav', { static: true }) nav!: IonNav;

  ngAfterViewInit() {
    if (this.rootComponent) {
      this.nav.setRoot(this.rootComponent, this.rootParams);
    }
  }
}
