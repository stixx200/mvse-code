import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mvse-ui-shared-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-shared-countdown.component.html',
  styleUrls: ['./ui-shared-countdown.component.css'],
})
export class UiSharedCountdownComponent implements OnDestroy {
  @Input('timeout') timeout!: number;
  @Output('onFinished') readonly finishedEvent = new EventEmitter<void>();

  private intervalHandle: any;

  public text = '';
  public running = false;

  constructor() {}

  ngOnDestroy() {
    this.abort();
  }

  start() {
    this.abort();
    this.running = true;
    this.text = `${this.timeout}`;
    this.intervalHandle = setInterval(() => {
      const curNumber = +this.text - 1;
      if (!curNumber) {
        this.abort();
        this.finishedEvent.emit();
      } else {
        this.text = `${curNumber}`;
      }
    }, 1000);
  }

  abort() {
    clearTimeout(this.intervalHandle);
    this.text = '';
    this.running = false;
  }
}
