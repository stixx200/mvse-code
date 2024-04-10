import { Route } from '@angular/router';
import { SetupComponent } from './components';
import { HomeComponent } from './components/home/home.component';
import { LayoutSelectorComponent } from './components/layout-selector/layout-selector.component';

export const appRoutes: Route[] = [
  { path: '', component: SetupComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'layout',
    component: LayoutSelectorComponent,
  },
  // { path: 'photo-list', component: PhotoListComponent },
];
