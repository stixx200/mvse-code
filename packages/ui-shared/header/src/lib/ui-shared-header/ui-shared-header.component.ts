import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'mvse-ui-shared-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ui-shared-header.component.html',
  styleUrls: ['./ui-shared-header.component.scss'],
})
export class UiSharedHeaderComponent {}
