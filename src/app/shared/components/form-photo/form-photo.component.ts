import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  IonButton,
  IonIcon,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, imagesOutline, trashOutline } from 'ionicons/icons';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';

@Component({
  selector: 'shared-form-photo',
  templateUrl: './form-photo.component.html',
  styleUrls: ['./form-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPhotoComponent),
      multi: true,
    },
  ],
  imports: [IonImg, IonButton, IonIcon, IonText],
})
export class FormPhotoComponent
  implements TypedControlValueAccessor<string | undefined>
{
  @Input() placeholder = 'Select photo';
  @Input() alt = 'Selected photo';
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) allowCamera = true;
  @Input({ transform: booleanAttribute }) allowGallery = true;
  @Input({ transform: booleanAttribute }) allowRemove = true;
  @Input() maxWidth = 300;
  @Input() maxHeight = 300;

  protected _value = signal<string | undefined>(undefined);
  protected _isDisabled = signal(false);

  private onChange: (value: string | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private alertController: AlertController) {
    addIcons({ cameraOutline, imagesOutline, trashOutline });
  }

  writeValue(value: string | undefined): void {
    this._value.set(value);
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  async selectPhoto(): Promise<void> {
    if (this._isDisabled() || this.readonly) {
      return;
    }

    this.onTouched();

    const buttons = [];

    if (this.allowCamera) {
      buttons.push({
        text: 'Camera',
        icon: 'camera-outline',
        handler: () => this.takePhoto(CameraSource.Camera),
      });
    }

    if (this.allowGallery) {
      buttons.push({
        text: 'Gallery',
        icon: 'images-outline',
        handler: () => this.takePhoto(CameraSource.Photos),
      });
    }

    if (this.allowRemove && this._value()) {
      buttons.push({
        text: 'Remove',
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => this.removePhoto(),
      });
    }

    buttons.push({
      text: 'Cancel',
      role: 'cancel',
    });

    const alert = await this.alertController.create({
      header: 'Select Photo',
      buttons,
    });

    await alert.present();
  }

  private async takePhoto(source: CameraSource): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source,
        width: this.maxWidth,
        height: this.maxHeight,
        correctOrientation: true,
      }).catch((error: Error) => error);

      if (image instanceof Error) {
        console.error('Camera error:', image);
        return;
      }

      if (image.dataUrl) {
        this._value.set(image.dataUrl);
        this.onChange(image.dataUrl);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  private removePhoto(): void {
    this._value.set(undefined);
    this.onChange(undefined);
  }
}
