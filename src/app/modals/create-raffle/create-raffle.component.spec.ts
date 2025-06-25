import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRaffleModalComponent } from './create-raffle.component';

describe('CreateRaffleModalComponent', () => {
  let component: CreateRaffleModalComponent;
  let fixture: ComponentFixture<CreateRaffleModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaffleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
