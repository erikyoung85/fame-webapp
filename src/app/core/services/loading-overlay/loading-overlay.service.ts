import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private readonly loadingController = inject(LoadingController);

  private loadingOverlay: HTMLIonLoadingElement | undefined;

  async showLoadingOverlay(): Promise<void> {
    this.hideLoadingOverlay(); // Dismiss any existing overlay

    // Create a new loading overlay and present it
    this.loadingOverlay = await this.loadingController.create({
      message: `Loading...`,
      spinner: 'crescent',
    });
    this.loadingOverlay.present();
  }

  hideLoadingOverlay(): void {
    this.loadingOverlay?.dismiss();
  }
}
