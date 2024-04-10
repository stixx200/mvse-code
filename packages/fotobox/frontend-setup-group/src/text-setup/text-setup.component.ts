import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface TextSetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (text: string) => void;
  value: Observable<string>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-text-setup',
  templateUrl: './text-setup.component.html',
  styleUrls: ['./text-setup.component.scss'],
  imports: [CommonModule, FormsModule, TranslateModule, MatFormFieldModule],
})
export class TextSetupComponent implements OnInit {
  @Input() config!: TextSetupConfig;

  constructor() {}

  ngOnInit() {}
}
