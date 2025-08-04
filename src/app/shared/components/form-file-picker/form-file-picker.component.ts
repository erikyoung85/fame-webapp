import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileViewer } from '@capacitor/file-viewer';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import {
  AlertController,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';
import { StorageService } from 'src/app/core/services/storage/storage.service';

export enum FilePickerFileType {
  Video = 'Video',
  Image = 'Image',
  File = 'File',
}

export enum FilePickerFileUrlType {
  Local = 'local',
  External = 'external',
}

export interface FilePickerFile {
  name: string;
  url: string;
  urlType: FilePickerFileUrlType;
  type: FilePickerFileType;
}

@Component({
  selector: 'shared-form-file-picker',
  templateUrl: './form-file-picker.component.html',
  styleUrls: ['./form-file-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFilePickerComponent),
      multi: true,
    },
  ],
  imports: [IonLabel, IonItem, IonList, IonButton, IonIcon],
})
export class FormFilePickerComponent
  implements TypedControlValueAccessor<FilePickerFile | undefined>
{
  private readonly alertController = inject(AlertController);
  private readonly storageService = inject(StorageService);

  readonly fileType = input<FilePickerFileType>(FilePickerFileType.File);
  readonly fileTypeLabel = input<string>();

  readonly _fileTypeLabel = computed(() => {
    return this.fileTypeLabel() ?? this.fileType();
  });

  protected readonly _value = signal<FilePickerFile | undefined>(undefined);
  protected readonly _isDisabled = signal(false);

  private onChange: (value: FilePickerFile | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: FilePickerFile | undefined): void {
    this._value.set(value ?? undefined);
  }

  registerOnChange(fn: (value: FilePickerFile | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  protected async viewFile(): Promise<void> {
    const file = this._value();
    if (file === undefined) {
      return;
    }

    if (file.urlType === FilePickerFileUrlType.Local) {
      await FileViewer.previewMediaContentFromLocalPath({
        path: file.url,
      });
      return;
    } else if (file.urlType === FilePickerFileUrlType.External) {
      await this.storageService.previewRafflePrize(file.url);
    }
  }

  protected async selectFileMenu(): Promise<void> {
    if (this._isDisabled()) {
      return;
    }

    this.onTouched();

    const buttons = [];

    buttons.push({
      text: 'Choose from Gallery',
      icon: 'images-outline',
      handler: () => this.pickFile(),
    });

    if (this._value()) {
      buttons.push({
        text: `Remove ${this._fileTypeLabel()}`,
        icon: 'trash-outline',
        role: 'destructive',
        handler: () => {
          this.removeFile();
        },
      });
    }

    buttons.push({
      text: 'Cancel',
      role: 'cancel',
    });

    const alert = await this.alertController.create({
      header: `Select ${this._fileTypeLabel()}`,
      buttons,
    });

    await alert.present();
  }

  protected async pickFile() {
    // Use FilePicker to select a video file
    let filePickResult;

    if (this.fileType() === 'Video') {
      filePickResult = await FilePicker.pickVideos({
        limit: 1,
      });
    } else if (this.fileType() === 'Image') {
      filePickResult = await FilePicker.pickImages({
        limit: 1,
      });
    } else {
      filePickResult = await FilePicker.pickFiles({
        limit: 1,
      });
    }

    const pickedFile = filePickResult.files[0];
    if (pickedFile === undefined || pickedFile.path === undefined) {
      return;
    }

    const file: FilePickerFile = {
      name: pickedFile.name,
      url: pickedFile.path,
      urlType: FilePickerFileUrlType.Local,
      type: this.fileType(),
    };

    this._value.set(file);
    this.onChange(this._value());
  }

  protected removeFile(): void {
    this._value.set(undefined);
    this.onChange(this._value());
  }
}
