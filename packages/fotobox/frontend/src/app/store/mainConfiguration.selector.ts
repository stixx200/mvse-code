import { createFeatureSelector } from '@ngrx/store';
import { MainConfigurationState } from './mainConfiguration.reducer';

export const selectMainConfiguration =
  createFeatureSelector<MainConfigurationState>('mainConfiguration');
