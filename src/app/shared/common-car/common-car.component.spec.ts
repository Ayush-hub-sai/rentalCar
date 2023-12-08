import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCarComponent } from './common-car.component';

describe('CommonCarComponent', () => {
  let component: CommonCarComponent;
  let fixture: ComponentFixture<CommonCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonCarComponent]
    });
    fixture = TestBed.createComponent(CommonCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
