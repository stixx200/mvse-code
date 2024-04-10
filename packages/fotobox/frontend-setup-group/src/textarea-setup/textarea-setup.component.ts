import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface TextareaSetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (texts: string[]) => void;
  texts: Observable<string[]>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-textarea-setup',
  templateUrl: './textarea-setup.component.html',
  styleUrls: ['./textarea-setup.component.scss'],
  imports: [CommonModule, FormsModule, TranslateModule, MatFormFieldModule],
})
export class TextareaSetupComponent {
  @Input() config!: TextareaSetupConfig;

  constructor() {}

  onTextChanged(index: number, target: EventTarget | null) {
    const texts = this.getObservableValue(this.config.texts);
    texts.splice(index, 1, (target as HTMLInputElement)?.value);
    this.config.onChanged(texts);
  }

  private getObservableValue(observable: Observable<any>): any {
    let value = null;
    const subscription = observable.subscribe((data) => {
      value = data;
    });
    subscription.unsubscribe();
    return value;
  }
}
