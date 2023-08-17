import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldsComponent } from './dynamic-fields.component';

describe('DynamicFieldsComponent', () => {
  let component: DynamicFieldsComponent;
  let fixture: ComponentFixture<DynamicFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFieldsComponent]
    });
    fixture = TestBed.createComponent(DynamicFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
