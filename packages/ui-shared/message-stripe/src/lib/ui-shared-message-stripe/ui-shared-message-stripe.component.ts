import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mvse-ui-shared-message-stripe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-shared-message-stripe.component.html',
  styleUrls: ['./ui-shared-message-stripe.component.css'],
})
export class UiSharedMessageStripeComponent {
  @Input() message!: string;
  @Output() action = new EventEmitter<void>();

  constructor() {}

  triggerAction() {
    this.action.emit();
  }
}
