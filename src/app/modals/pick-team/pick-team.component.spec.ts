import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickTeamModalComponent } from './pick-team.component';

describe('PickTeamModalComponent', () => {
  let component: PickTeamModalComponent;
  let fixture: ComponentFixture<PickTeamModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
