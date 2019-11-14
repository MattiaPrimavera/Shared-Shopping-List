import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserUidFormComponent } from './get-user-uid-form.component';

describe('GetUserUidFormComponent', () => {
  let component: GetUserUidFormComponent;
  let fixture: ComponentFixture<GetUserUidFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserUidFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserUidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
