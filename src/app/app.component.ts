import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { userActions } from './core/user/store/actions/user.actions';
import { userFeature } from './core/user/store/feature/user.feature';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonAvatar,
    RouterLink,
    IonItem,
    IonContent,
    IonIcon,
    IonSplitPane,
    IonLabel,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonList,
    IonListHeader,
    IonMenuToggle,
  ],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  readonly user$ = this.store.select(userFeature.selectUser);

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    { title: 'Login', url: '/login', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    addIcons({ ...ionIcons });
  }

  ngOnInit(): void {
    this.store.dispatch(userActions.loadSession());
  }
}
