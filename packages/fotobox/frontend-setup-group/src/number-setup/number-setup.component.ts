import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface NumberSetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (number: number) => void;
  value: Observable<number>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-number-setup',
  templateUrl: './number-setup.component.html',
  styleUrls: ['./number-setup.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
  ],
})
export class NumberSetupComponent implements OnInit {
  @Input() config!: NumberSetupConfig;

  constructor() {}

  ngOnInit() {}
}
