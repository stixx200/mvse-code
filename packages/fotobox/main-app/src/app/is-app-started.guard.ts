import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GetStateGQL } from '@mvse/fotobox/frontend-data-access';
import { map } from 'rxjs';

export const isAppStartedGuard: CanActivateFn = (route, state) => {
  const getStateGQL = inject(GetStateGQL);
  const router = inject(Router);

  return getStateGQL.fetch().pipe(
    map((result) => {
      const { appStarted } = result.data.state;
      if (!appStarted) {
        return router.parseUrl('/setup');
      }
      return true;
    })
  );
};
