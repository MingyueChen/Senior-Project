import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreateComponent } from './home-create.component';

describe('HomeComponent', () => {
  let component: HomeCreateComponent;
  let fixture: ComponentFixture<HomeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
