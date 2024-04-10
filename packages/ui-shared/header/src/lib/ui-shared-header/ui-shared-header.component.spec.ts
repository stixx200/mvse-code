import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSharedHeaderComponent } from './ui-shared-header.component';

describe('UiSharedHeaderComponent', () => {
  let component: UiSharedHeaderComponent;
  let fixture: ComponentFixture<UiSharedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSharedHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSharedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
