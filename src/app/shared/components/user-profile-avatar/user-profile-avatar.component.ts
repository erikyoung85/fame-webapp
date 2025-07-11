import { NgClass, NgIf } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonAvatar, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import * as CSS from 'csstype';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';
import { IsNilOrEmptyPipe } from '../../pipes/is-nil-or-empty/is-nil-or-empty.pipe';

@Component({
  selector: 'app-user-profile-avatar',
  templateUrl: './user-profile-avatar.component.html',
  styleUrls: ['./user-profile-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserProfileAvatarComponent),
      multi: true,
    },
  ],
  imports: [NgIf, IonIcon, IonFabButton, IonAvatar, IsNilOrEmptyPipe, NgClass],
})
export class UserProfileAvatarComponent
  implements TypedControlValueAccessor<string | undefined>, OnChanges
{
  @Input() avatarSrc: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) editMode: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'auto' =
    'small';
  @Input({ transform: booleanAttribute }) border: boolean = false;
  @Input() background?: CSS.Properties['background'] = 'white';
  @Input() defaultAvatarSrc?: string | undefined;

  protected readonly DEFAULT_AVATAR_SRC = 'assets/images/default-avatar.svg';

  protected readonly _value = signal<string | undefined>(undefined);
  protected readonly _isDisabled = signal<boolean>(false);
  protected readonly _isTouched = signal<boolean>(false);

  protected async editImageClicked() {
    if (this._isDisabled()) {
      return;
    }

    const image = await Camera.getPhoto({
      quality: 80, // compression quality
      allowEditing: true, // native crop UI on iOS/Android
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      width: 400, // resize to 400px
      height: 400,
    }).catch((error) => new Error('Camera error: ' + error));

    if (this._isTouched() === false) {
      this._isTouched.set(true);
      this._onTouched();
    }

    if (image instanceof Error) return;

    if (image?.dataUrl) {
      this._value.set(image.dataUrl);
      this._onChange(this._value());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarSrc'] && this.avatarSrc !== this._value()) {
      this.writeValue(this.avatarSrc);
    }
  }

  // ControlValueAccessor methods
  writeValue(newValue: unknown): void {
    const parsedValue = newValue?.toString();
    this._value.set(parsedValue);
  }

  private _onChange = (_: string | undefined) => {};
  registerOnChange(fn: (_: string | undefined) => void): void {
    this._onChange = fn;
  }

  private _onTouched = () => {};
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }
}
