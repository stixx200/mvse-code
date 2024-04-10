import {
  createAction,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';

type CollageComponent = 'single' | 'collage';

export interface Template {
  title: string;
  id: string;
}

export interface Layout {
  component: CollageComponent;
  title: string;
  config?: { templateId?: string };
  previewUrl?: string;
}

export interface MainConfigurationState {
  cameraDrivers: string[];
  selectedCameraDriver: string;
  usePrinter: boolean;
  photoDir: string;
  wifiControl: boolean;
  sonyPassword: string;
  shutterTimeout: number;
  templatesDirectory: string;
  availableTemplates: Template[];
  usedLayouts: Layout[];
}

const initialState: MainConfigurationState = {
  cameraDrivers: [],
  selectedCameraDriver: '',
  usePrinter: true,
  photoDir: '',
  wifiControl: true,
  sonyPassword: '',
  shutterTimeout: 3,
  templatesDirectory: '',
  availableTemplates: [],
  usedLayouts: [
    {
      title: 'PAGES.SETUP.FOTOBOX.SINGLE',
      component: 'single',
      previewUrl: '../../../assets/singlelayout.preview.jpg',
    },
  ],
};

export const loadDataFromBackend = createAction(
  '[MainConfiguration] LoadDataFromBackend'
);
export const setCameraDrivers = createAction(
  '[MainConfiguration] SetCameraDrivers',
  props<{ cameraDrivers: MainConfigurationState['cameraDrivers'] }>()
);
export const setSelectedCameraDriver = createAction(
  '[MainConfiguration] SetSelectedCameraDriver',
  props<{
    selectedCameraDriver: MainConfigurationState['selectedCameraDriver'];
  }>()
);
export const setUsePrinter = createAction(
  '[MainConfiguration] UsePrinter',
  props<{ usePrinter: MainConfigurationState['usePrinter'] }>()
);
export const setPhotoDir = createAction(
  '[MainConfiguration] SetPhotoDir',
  props<{ photoDir: MainConfigurationState['photoDir'] }>()
);
export const setShutterTimeout = createAction(
  '[MainConfiguration] SetShutterTimeout',
  props<{ shutterTimeout: MainConfigurationState['shutterTimeout'] }>()
);
export const setTemplatesDirectory = createAction(
  '[MainConfiguration] SetTemplatesDirectory',
  props<{ templatesDirectory: MainConfigurationState['templatesDirectory'] }>()
);
export const setAvailableTemplates = createAction(
  '[MainConfiguration] SetAvailableTemplates',
  props<{ availableTemplates: MainConfigurationState['availableTemplates'] }>()
);
export const setUsedLayouts = createAction(
  '[MainConfiguration] SetUsedLayouts',
  props<{ usedLayouts: MainConfigurationState['usedLayouts'] }>()
);

export const mainConfigurationFeature = createFeature({
  name: 'mainConfiguration',
  reducer: createReducer(
    initialState,
    on(loadDataFromBackend, (state) => state),
    on(setCameraDrivers, (state, { cameraDrivers }) => ({
      ...state,
      cameraDrivers,
    })),
    on(setSelectedCameraDriver, (state, { selectedCameraDriver }) => ({
      ...state,
      selectedCameraDriver,
    })),
    on(setUsePrinter, (state, { usePrinter }) => ({ ...state, usePrinter })),
    on(setPhotoDir, (state, { photoDir }) => ({ ...state, photoDir })),
    on(setShutterTimeout, (state, { shutterTimeout }) => ({
      ...state,
      shutterTimeout,
    })),
    on(setTemplatesDirectory, (state, { templatesDirectory }) => ({
      ...state,
      templatesDirectory,
    })),
    on(setAvailableTemplates, (state, { availableTemplates }) => ({
      ...state,
      availableTemplates,
    })),
    on(setUsedLayouts, (state, { usedLayouts }) => ({
      ...state,
      usedLayouts,
    }))
  ),
});
