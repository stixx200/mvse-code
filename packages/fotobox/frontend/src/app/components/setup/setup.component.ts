import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiSharedHeaderComponent } from '@mvse/ui-shared/header';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  firstValueFrom,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  GetTemplatesFromDirectoryGQL,
  StartApplicationGQL,
  StatusGQL,
} from '@mvse/fotobox/frontend-data-access';
import { Store } from '@ngrx/store';
import {
  Layout,
  loadDataFromBackend,
  MainConfigurationState,
  setAvailableTemplates,
  setPhotoDir,
  setSelectedCameraDriver,
  setShutterTimeout,
  setUsedLayouts,
  setUsePrinter,
} from '../../store/mainConfiguration.reducer';
import { selectMainConfiguration } from '../../store/mainConfiguration.selector';
import {
  FrontendSetupGroupComponent,
  SetupConfig,
} from '@mvse/fotobox/frontend-setup-group';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
  ModalModule,
} from 'ngx-bootstrap/modal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    UiSharedHeaderComponent,
    MatTabsModule,
    FrontendSetupGroupComponent,
    RouterModule,
    ModalModule,
    MatButtonModule,
  ],
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  mainConfigurationState = this.store.select(selectMainConfiguration);

  reloadConfigs$ = new BehaviorSubject({});
  setupConfigs$: Observable<Record<string, SetupConfig[]>> =
    this.mainConfigurationState.pipe(
      switchMap(async () => {
        return {
          ['general']: await this.addGeneralSetup(),
          // ['camera']: await this.addCameraSetup(),
          // ['advanced']: await this.getAdvancedSetup(),
        };
      })
    );
  cameraDrivers$: Observable<string[]> = this.mainConfigurationState.pipe(
    map((result) => result.cameraDrivers)
  );
  selectedCameraDriver$: Observable<string | null> =
    this.mainConfigurationState.pipe(
      map((result) => result.selectedCameraDriver)
    );
  availableTemplates$ = this.mainConfigurationState.pipe(
    map((result) => result.availableTemplates)
  );

  statusMessage$: Observable<string> = merge(
    of('PAGES.SETUP.FOTOBOX.MODAL.STATUS_INITIALIZING'),
    this.status.subscribe().pipe(map((d) => d.data?.status.message || ''))
  );
  modalRef?: BsModalRef;

  startApplication$ = new Subject<HTMLDivElement>();
  startApplicationSubcription = this.startApplication$
    .pipe(
      tap((template) => {
        this.modalService.show(template as unknown as TemplateRef<any>);
      }),
      withLatestFrom(this.mainConfigurationState),
      switchMap(([template, mainConfiguration]) => {
        console.log('start application with settings: ', mainConfiguration);

        return this.startApplication.mutate({
          Settings: {
            photoDir: mainConfiguration.photoDir,
            selectedCameraDriver: mainConfiguration.selectedCameraDriver,
          },
        });
      }),
      switchMap(async () => {
        this.modalRef?.hide();
        console.log('Application has started. Navigate to home.');
        return await this.router.navigate(['/home']);
      })
    )
    .subscribe();

  layoutsSelectionChanged$ = new Subject<string[]>();
  layoutsSelectionChangedSubscription = this.layoutsSelectionChanged$.pipe(
    withLatestFrom(this.mainConfigurationState),
    map(([newTemplateTitles, mainConfiguration]) => {
      const otherLayouts = mainConfiguration.usedLayouts.filter(
        (layout) => layout.component !== 'collage'
      );
      const newCollageLayouts: Layout[] = newTemplateTitles.map((title) => ({
        title,
        component: 'collage',
        config: {
          templateId: mainConfiguration.availableTemplates.find(
            (template) => template.title === title
          )!.id,
        },
      }));
      return [...otherLayouts, ...newCollageLayouts];
    })
  );

  constructor(
    private store: Store,
    private router: Router,
    private readonly getTemplatesFromDirectory: GetTemplatesFromDirectoryGQL,
    private readonly modalService: BsModalService,
    private readonly startApplication: StartApplicationGQL,
    private readonly status: StatusGQL
  ) {}

  async ngOnInit() {
    this.store.dispatch(loadDataFromBackend());
    this.closeModal();
  }

  ngOnDestroy() {
    this.closeModal();
    this.startApplicationSubcription.unsubscribe();
  }

  abort() {
    // this.ipcRenderer.send(TOPICS.STOP_APPLICATION);
    this.closeModal();
  }

  closeModal() {
    this.modalRef?.hide();
  }

  //
  // onLayoutSelectionChanged(selection) {
  //   const singleLayout = this.getObservableValue(
  //     this.singleLayoutState,
  //     'title'
  //   );
  //   const collageLayout = this.getObservableValue(
  //     this.collageLayoutState,
  //     'title'
  //   );
  //   this.store.dispatch(
  //     new singleLayoutActions.SetActive(selection.includes(singleLayout))
  //   );
  //   this.store.dispatch(
  //     new collageLayoutActions.SetActive(selection.includes(collageLayout))
  //   );
  //
  //   await this.initConfigs();
  // }
  //
  // /*
  //  * Setup view configuration
  //  */

  private async addGeneralSetup() {
    return [
      {
        type: 'directory',
        title: 'PAGES.SETUP.SYSTEM.PHOTO_DIRECTORY',
        onChanged: (directory: string) => {
          this.store.dispatch(setPhotoDir({ photoDir: directory }));
        },
        value: this.mainConfigurationState.pipe(
          map((result) => result.photoDir)
        ),
      },
      {
        type: 'checkbox',
        title: 'PAGES.SETUP.SYSTEM.USE_PRINTER',
        onChanged: (state: boolean) =>
          this.store.dispatch(setUsePrinter({ usePrinter: state })),
        state: this.mainConfigurationState.pipe(
          map((result) => result.usePrinter)
        ),
      },
      {
        type: 'number',
        title: 'PAGES.SETUP.SYSTEM.SHUTTER_TIMEOUT',
        onChanged: (timeout: number) => {
          this.store.dispatch(setShutterTimeout({ shutterTimeout: timeout }));
        },
        value: this.mainConfigurationState.pipe(
          map((result) => result.shutterTimeout)
        ),
      },
      {
        type: 'multi-selection',
        title: 'PAGES.SETUP.FOTOBOX.LAYOUTS.TITLE',
        selection: this.availableTemplates$.pipe(
          map((result) => result.map(({ title }) => title))
        ),
        selected: this.mainConfigurationState.pipe(
          map(({ usedLayouts }) => usedLayouts.map((layout) => layout.title))
        ),
        onChanged: (selection: string[]) => {
          this.layoutsSelectionChanged$.next(selection);
        },
      },
      // ...this.addCollageSetup(),
    ];
  }

  // private addCollageSetup() {
  //   return [];
  //   // if (collageLayoutActive) {
  //   //   this.setupConfigs.collage = [
  //   //     {
  //   //       type: 'directory',
  //   //       title: 'PAGES.SETUP.SYSTEM.TEMPLATES_DIRECTORY',
  //   //       onChanged: (directory) => {
  //   //         this.store.dispatch(
  //   //           new collageLayoutActions.SetTemplatesDir(directory)
  //   //         );
  //   //         // get all templates from the new directory and update available templates
  //   //         this.updateTemplates(directory);
  //   //       },
  //   //       value: this.collageLayoutState.pipe(
  //   //         map((state: fromCollageLayout.State) => state.templatesDirectory)
  //   //       ),
  //   //     },
  //   //     {
  //   //       type: 'button',
  //   //       title: 'PAGES.SETUP.SYSTEM.UPDATE_TEMPLATES',
  //   //       onClick: () => this.updateTemplates(),
  //   //     },
  //   //     {
  //   //       title: 'PAGES.SETUP.FOTOBOX.LAYOUTS.COLLAGE-TEMPLATE',
  //   //       type: 'selection',
  //   //       selection: this.collageLayoutState.pipe(
  //   //         map((state: fromCollageLayout.State) => state.templates)
  //   //       ),
  //   //       selected: this.collageLayoutState.pipe(
  //   //         map((state: fromCollageLayout.State) => state.templateId)
  //   //       ),
  //   //       onChanged: (template) => {
  //   //         this.store.dispatch(new collageLayoutActions.SetTemplate(template));
  //   //       },
  //   //     },
  //   //   ];
  //   // }
  // }

  private async addCameraSetup() {
    return [
      {
        type: 'selection',
        title: 'PAGES.SETUP.SYSTEM.CAMERA_DRIVERS.TITLE',
        selection: this.cameraDrivers$.pipe(
          map((drivers: string[]) => drivers.map((driver) => driver))
        ),
        selected: this.selectedCameraDriver$.pipe(
          map((driver) => driver || '')
        ),
        onChanged: async (selectedCameraDriver: string) => {
          this.store.dispatch(
            setSelectedCameraDriver({ selectedCameraDriver })
          );
        },
        translationBase: 'PAGES.SETUP.SYSTEM.CAMERA_DRIVERS.',
      },
    ];

    const selectedCameraDriver = await firstValueFrom(
      this.selectedCameraDriver$
    );
    if (selectedCameraDriver === 'sony') {
      // this.setupConfigs['camera'].push({
      //   type: 'checkbox',
      //   title: 'PAGES.SETUP.SYSTEM.SONY.AUTOCONNECT',
      //   state: this.mainConfigurationState.pipe(
      //     map((state: fromMainConfiguration.State) => state.wifiControl)
      //   ),
      //   onChanged: (state) => {
      //     this.store.dispatch(
      //       new mainConfigurationActions.SetWifiControl(state)
      //     );
      //     this.initConfigs();
      //   },
      // });
      // const wifiControl = this.getObservableValue(
      //   this.mainConfigurationState,
      //   'wifiControl'
      // );
      // if (wifiControl) {
      //   this.setupConfigs.camera.push({
      //     type: 'text',
      //     title: 'PAGES.SETUP.SYSTEM.SONY.PASSWORD',
      //     value: this.mainConfigurationState.pipe(
      //       map((state: fromMainConfiguration.State) => state.sonyPassword)
      //     ),
      //     onChanged: (password) => {
      //       this.store.dispatch(
      //         new mainConfigurationActions.SetSonyPassword(password)
      //       );
      //     },
      //   });
      // }
    }
  }

  // private addAdvancedSetup() {
  //   this.setupConfigs.advanced = [
  //     {
  //       type: 'file',
  //       title: 'PAGES.SETUP.SYSTEM.IRFANVIEW_PATH',
  //       onChanged: (newPath) =>
  //         this.store.dispatch(
  //           new mainConfigurationActions.SetIrfanViewPath(newPath)
  //         ),
  //       value: this.mainConfigurationState.pipe(
  //         map((state) => state.irfanViewPath)
  //       ),
  //     },
  //   ];
  // }
  //
  // private getObservableValue(observable: Observable<any>, key: string): any {
  //   let value = null;
  //   const subscription = observable.pipe(first()).subscribe((data) => {
  //     value = data[key];
  //   });
  //   subscription.unsubscribe();
  //   return value;
  // }
  protected readonly TemplateRef = TemplateRef;
}
