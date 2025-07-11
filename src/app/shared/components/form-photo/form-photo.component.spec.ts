import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { FormPhotoComponent } from './form-photo.component';

describe('FormPhotoComponent', () => {
  let component: FormPhotoComponent;
  let fixture: ComponentFixture<FormPhotoComponent>;
  let alertController: AlertController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormPhotoComponent],
      providers: [AlertController],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPhotoComponent);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should update value when writeValue is called', () => {
    const testUrl = 'data:image/jpeg;base64,test';
    component.writeValue(testUrl);
    expect(component['_value']()).toBe(testUrl);
  });

  it('should set disabled state correctly', () => {
    component.setDisabledState(true);
    expect(component['_isDisabled']()).toBe(true);

    component.setDisabledState(false);
    expect(component['_isDisabled']()).toBe(false);
  });

  it('should not show photo when value is undefined', () => {
    component.writeValue(undefined);
    fixture.detectChanges();

    const photoDisplay = fixture.nativeElement.querySelector('.photo-display');
    const placeholder =
      fixture.nativeElement.querySelector('.photo-placeholder');

    expect(photoDisplay).toBeFalsy();
    expect(placeholder).toBeTruthy();
  });

  it('should show photo when value is set', () => {
    const testUrl = 'data:image/jpeg;base64,test';
    component.writeValue(testUrl);
    fixture.detectChanges();

    const photoDisplay = fixture.nativeElement.querySelector('.photo-display');
    const placeholder =
      fixture.nativeElement.querySelector('.photo-placeholder');

    expect(photoDisplay).toBeTruthy();
    expect(placeholder).toBeFalsy();
  });
});
