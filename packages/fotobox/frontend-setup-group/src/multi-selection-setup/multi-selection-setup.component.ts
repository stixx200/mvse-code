import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

export interface MultiSelectionSetupConfig extends BasicSetupConfig {
  type: string;
  translationBase?: string;
  selection: Observable<string[]>;
  selected: Observable<string[]>;
  onChanged: (selected: string[]) => void;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-multi-selection-setup',
  templateUrl: './multi-selection-setup.component.html',
  styleUrls: ['./multi-selection-setup.component.scss'],
  imports: [CommonModule, FormsModule, MatCheckboxModule, TranslateModule],
})
export class MultiSelectionSetupComponent implements OnInit {
  @Input() config!: MultiSelectionSetupConfig;

  constructor() {}

  ngOnInit() {}

  isSelected(value: string) {
    const selected = this.getSelected();
    return selected.includes(value);
  }

  selectionChanged(value: string, isSelected: boolean) {
    const selected = this.getSelected();
    if (isSelected && !selected.includes(value)) {
      selected.push(value);
    } else if (!isSelected && selected.includes(value)) {
      const idx = selected.findIndex((val) => val === value);
      selected.splice(idx, 1);
    }
    this.config.onChanged(selected);
  }

  private getSelected(): string[] {
    let selected: string[] = [];
    const subscription = this.config.selected.subscribe((sel) => {
      selected = sel;
    });
    subscription.unsubscribe();
    return selected;
  }
}
