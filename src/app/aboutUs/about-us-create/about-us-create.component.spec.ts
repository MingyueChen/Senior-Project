import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsCreateComponent } from './about-us-create.component';

describe('AboutUsCreateComponent', () => {
  let component: AboutUsCreateComponent;
  let fixture: ComponentFixture<AboutUsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
