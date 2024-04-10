import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

export interface SelectionSetupConfig extends BasicSetupConfig {
  type: string;
  translationBase?: string;
  selection: Observable<string[]>;
  selected: Observable<string>;
  onChanged: (event: string) => void;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-selection-setup',
  templateUrl: './selection-setup.component.html',
  styleUrls: ['./selection-setup.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
  ],
})
export class SelectionSetupComponent implements OnInit {
  @Input() config!: SelectionSetupConfig;

  constructor() {}

  ngOnInit() {}
}
