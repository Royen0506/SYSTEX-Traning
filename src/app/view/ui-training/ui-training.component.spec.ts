import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTrainingComponent } from './ui-training.component';

describe('UiTrainingComponent', () => {
  let component: UiTrainingComponent;
  let fixture: ComponentFixture<UiTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
