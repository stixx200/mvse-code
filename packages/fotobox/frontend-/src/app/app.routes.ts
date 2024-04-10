import { Route } from '@angular/router';
import {
  HomeComponent,
  PhotoListComponent,
  SetupComponent,
} from './components';
import { CollageLayoutComponent, SingleLayoutComponent } from './layouts';

export const appRoutes: Route[] = [
  { path: '', component: SetupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'photo-list', component: PhotoListComponent },
  {
    path: 'layouts',
    children: [
      { path: 'single', component: SingleLayoutComponent },
      { path: 'collage', component: CollageLayoutComponent },
    ],
  },
];
