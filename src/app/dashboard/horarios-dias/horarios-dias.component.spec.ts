import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosDiasComponent } from './horarios-dias.component';

describe('HorariosDiasComponent', () => {
  let component: HorariosDiasComponent;
  let fixture: ComponentFixture<HorariosDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorariosDiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
