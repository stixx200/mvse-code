import { Component, Input } from '@angular/core';
import {
  ButtonSetupComponent,
  ButtonSetupConfig,
} from './button-setup/button-setup.component';
import {
  CheckboxSetupComponent,
  CheckboxSetupConfig,
} from './checkbox-setup/checkbox-setup.component';
import {
  DirectorySetupComponent,
  DirectorySetupConfig,
} from './directory-setup/directory-setup.component';
import {
  FileSetupComponent,
  FileSetupConfig,
} from './file-setup/file-setup.component';
import {
  MultiSelectionSetupComponent,
  MultiSelectionSetupConfig,
} from './multi-selection-setup/multi-selection-setup.component';
import {
  NumberSetupComponent,
  NumberSetupConfig,
} from './number-setup/number-setup.component';
import {
  SelectionSetupComponent,
  SelectionSetupConfig,
} from './selection-setup/selection-setup.component';
import {
  TextareaSetupComponent,
  TextareaSetupConfig,
} from './textarea-setup/textarea-setup.component';
import { TextSetupComponent } from './text-setup/text-setup.component';
import { CommonModule } from '@angular/common';

export type SetupConfig =
  | SelectionSetupConfig
  | DirectorySetupConfig
  | FileSetupConfig
  | CheckboxSetupConfig
  | MultiSelectionSetupConfig
  | TextareaSetupConfig
  | NumberSetupConfig
  | ButtonSetupConfig;

@Component({
  standalone: true,
  selector: 'fotobox-frontend-setup-group',
  templateUrl: './frontend-setup-group.component.html',
  styleUrls: ['./frontend-setup-group.component.scss'],
  imports: [
    CommonModule,
    ButtonSetupComponent,
    CheckboxSetupComponent,
    DirectorySetupComponent,
    FileSetupComponent,
    MultiSelectionSetupComponent,
    NumberSetupComponent,
    SelectionSetupComponent,
    TextSetupComponent,
    TextareaSetupComponent,
  ],
})
export class FrontendSetupGroupComponent {
  @Input() config: (SetupConfig & any)[] = [];
}
