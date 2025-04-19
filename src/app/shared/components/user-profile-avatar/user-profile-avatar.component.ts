import { NgIf } from '@angular/common';
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonAvatar, IonFabButton, IonIcon } from '@ionic/angular/standalone';
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
  imports: [NgIf, IonIcon, IonFabButton, IonAvatar, IsNilOrEmptyPipe],
})
export class UserProfileAvatarComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() avatarSrc: string | undefined = undefined;
  @Input({ transform: booleanAttribute }) editMode: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'auto' =
    'auto';

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
    });

    if (this._isTouched() === false) {
      this._isTouched.set(true);
      this._onTouched();
    }

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
  writeValue(newValue: string | undefined): void {
    this._value.set(newValue);
  }

  private _onChange = (_: string | undefined) => {};
  registerOnChange(fn: (_: string | undefined) => void): void {
    this._onChange = fn;
  }

  private _onTouched = () => {};
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }
}
