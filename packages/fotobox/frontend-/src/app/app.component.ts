import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ElectronService } from './providers/electron.service';
import { IpcRendererService } from './providers/ipc.renderer.service';
import { LiveViewService } from './providers/live-view.service';
import { CommonModule } from '@angular/common';
import { MaterialModule, TOPICS } from '@mvse/fotobox/shared';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule],
  selector: 'mvse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  liveViewSubscription?: Subscription;
  snackBarRef?: MatSnackBarRef<SimpleSnackBar>;

  @ViewChild('page')
  page!: ElementRef;

  constructor(
    public electronService: ElectronService,
    private ipcRenderer: IpcRendererService,
    private router: Router,
    private liveViewService: LiveViewService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {
    this.onErrorMessage = this.onErrorMessage.bind(this);
    this.onApplicationStopped = this.onApplicationStopped.bind(this);
    console.log('Electron ipcRenderer', electronService.ipcRenderer);
  }

  ngOnInit() {
    this.ipcRenderer.on(TOPICS.ERROR_MESSAGE, this.onErrorMessage);
    this.ipcRenderer.on(TOPICS.STOP_APPLICATION, this.onApplicationStopped);
    this.liveViewSubscription = this.liveViewService
      .getLiveView()
      .subscribe((data: SafeResourceUrl) => this.onLiveViewData(data));
  }

  ngOnDestroy() {
    this.dismissSnackbar();
    if (this.liveViewSubscription) {
      this.liveViewSubscription.unsubscribe();
    }
    this.removeBackground();
    this.ipcRenderer.removeListener(
      TOPICS.STOP_APPLICATION,
      this.onApplicationStopped
    );
    this.ipcRenderer.removeListener(TOPICS.ERROR_MESSAGE, this.onErrorMessage);
  }

  onApplicationStopped(event: never, errorCode?: string) {
    console.warn(
      'Application has stopped. Goto settings. Error was: ' +
        JSON.stringify(errorCode)
    );
    this.removeBackground();
    this.router.navigate(['/']).catch(console.error);
    if (errorCode) {
      this.showSnackbar(errorCode);
    }
  }

  private onLiveViewData(data: SafeResourceUrl) {
    this.renderer.setStyle(this.page.nativeElement, 'background-size', `cover`);
    this.renderer.setStyle(
      this.page.nativeElement,
      'background-image',
      `url(${data})`
    );
  }

  private removeBackground() {
    this.renderer.removeStyle(this.page.nativeElement, 'background-size');
    this.renderer.removeStyle(this.page.nativeElement, 'background-image');
  }

  private showSnackbar(message: string) {
    this.dismissSnackbar();
    this.snackBarRef = this.snackBar.open(message, 'ok');
  }

  private dismissSnackbar() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  private onErrorMessage(_event: never, message: string) {
    console.error(message);
    this.showSnackbar(message);
  }
}
