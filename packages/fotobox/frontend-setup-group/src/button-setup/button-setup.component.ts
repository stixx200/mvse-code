import { Component, Input, OnInit } from '@angular/core';
import { BasicSetupConfig } from '../basic-setup-config';
import { TranslateModule } from '@ngx-translate/core';

export interface ButtonSetupConfig extends BasicSetupConfig {
  type: string;
  onClick: () => void;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-button-setup',
  templateUrl: './button-setup.component.html',
  styleUrls: ['./button-setup.component.scss'],
  imports: [TranslateModule],
})
export class ButtonSetupComponent implements OnInit {
  @Input() config!: ButtonSetupConfig;

  constructor() {}

  ngOnInit() {}
}
