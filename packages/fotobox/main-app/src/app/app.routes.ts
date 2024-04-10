import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { isAppStartedGuard } from './is-app-started.guard';
import { SetupComponent } from './components/setup/setup.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [isAppStartedGuard] },
  { path: 'setup', component: SetupComponent },
];
