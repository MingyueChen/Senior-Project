import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsCreateComponent } from './testimonials-create.component';

describe('TestimonialsCreateComponent', () => {
  let component: TestimonialsCreateComponent;
  let fixture: ComponentFixture<TestimonialsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
