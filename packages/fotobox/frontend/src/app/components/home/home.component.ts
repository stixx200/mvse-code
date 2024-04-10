import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Subscription, withLatestFrom } from 'rxjs';
import { NewPhotoGQL } from '@mvse/fotobox/frontend-data-access';
import { selectMainConfiguration } from '../../store/mainConfiguration.selector';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, TranslateModule],
  selector: 'mvse-fotobox-frontend-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly mainConfigurationState = this.store.select(
    selectMainConfiguration
  );
  usedLayouts$ = this.mainConfigurationState.pipe(
    map((state) => state.usedLayouts)
  );
  private subscription?: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private newPhotoGql: NewPhotoGQL
  ) {}

  async ngOnInit() {
    const usedLayouts = await firstValueFrom(this.usedLayouts$);
    if (usedLayouts.length < 2) {
      await this.router.navigate([
        '/layouts',
        { layout: usedLayouts[0].component },
      ]);
      return;
    }

    this.subscription = this.newPhotoGql
      .subscribe()
      .pipe(withLatestFrom(this.usedLayouts$))
      .subscribe(([{ data }, usedLayouts]) => {
        if (data?.newPhoto.uri) {
          this.router.navigate([
            '/layouts',
            { layout: usedLayouts[0].component, photo: data.newPhoto.uri },
          ]);
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
