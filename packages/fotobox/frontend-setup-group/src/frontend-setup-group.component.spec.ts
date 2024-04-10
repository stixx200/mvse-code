import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSetupGroupComponent } from './frontend-setup-group.component';

describe('SetupGroupComponent', () => {
  let component: FrontendSetupGroupComponent;
  let fixture: ComponentFixture<FrontendSetupGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontendSetupGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendSetupGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
