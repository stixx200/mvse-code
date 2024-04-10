import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CheckboxSetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (state: boolean) => void;
  state: Observable<boolean>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-checkbox-setup',
  templateUrl: './checkbox-setup.component.html',
  styleUrls: ['./checkbox-setup.component.scss'],
  imports: [CommonModule, FormsModule, MatCheckboxModule, TranslateModule],
})
export class CheckboxSetupComponent implements OnInit {
  @Input() config!: CheckboxSetupConfig;

  constructor() {}

  ngOnInit() {}
}
