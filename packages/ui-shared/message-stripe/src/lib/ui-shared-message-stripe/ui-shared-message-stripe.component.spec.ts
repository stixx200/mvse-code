import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSharedMessageStripeComponent } from './ui-shared-message-stripe.component';

describe('UiSharedMessageStripeComponent', () => {
  let component: UiSharedMessageStripeComponent;
  let fixture: ComponentFixture<UiSharedMessageStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSharedMessageStripeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSharedMessageStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
