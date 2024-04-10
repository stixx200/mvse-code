import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  FilePickerMode,
  GetFilePickerResultGQL,
} from '@mvse/fotobox/frontend-data-access';

export interface FileSetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (path: string) => void;
  value: Observable<string>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-file-setup',
  templateUrl: './file-setup.component.html',
  styleUrls: ['./file-setup.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    MatInputModule,
  ],
})
export class FileSetupComponent implements OnInit {
  @Input() config!: FileSetupConfig;

  constructor(private readonly filePicker: GetFilePickerResultGQL) {}

  ngOnInit() {}

  async openFilePicker(event: EventTarget | null) {
    const file = await firstValueFrom(
      this.filePicker.fetch({
        Mode: FilePickerMode.File,
        defaultPath: (event as HTMLInputElement).value,
      })
    );
    if (file.data.filePickerResult) {
      this.config.onChanged(file.data.filePickerResult);
    }
  }
}
