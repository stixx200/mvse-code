import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BasicSetupConfig } from '../basic-setup-config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  FilePickerMode,
  GetFilePickerResultGQL,
} from '@mvse/fotobox/frontend-data-access';
import { FormsModule } from '@angular/forms';

export interface DirectorySetupConfig extends BasicSetupConfig {
  type: string;
  onChanged: (path: string) => void;
  value: Observable<string>;
}

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group-directory-setup',
  templateUrl: './directory-setup.component.html',
  styleUrls: ['./directory-setup.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
})
export class DirectorySetupComponent implements OnInit {
  @Input() config!: DirectorySetupConfig;

  constructor(private readonly filePicker: GetFilePickerResultGQL) {}

  ngOnInit() {}

  async openFilePicker(event: EventTarget | null) {
    const file = await firstValueFrom(
      this.filePicker.fetch({
        Mode: FilePickerMode.Directory,
        defaultPath: (event as HTMLInputElement).value,
      })
    );
    if (file.data.filePickerResult) {
      this.config.onChanged(file.data.filePickerResult);
    }
  }
}
