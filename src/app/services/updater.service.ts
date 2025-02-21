import { concat, first, interval, Subscription } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UpdaterService {
  readonly logPrefix: string = '[UpdaterService]';

  private subscriptions?: Subscription;

  constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate
  ) {
    console.info(this.logPrefix, 'Updater start up');
  }

  start() {
    if (!this.subscriptions) {
      this.subscriptions = new Subscription();
    }
    let subscription = this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.info(
            this.logPrefix,
            `Downloading new app version: ${evt.version.hash}`,
          );
          break;
        case 'VERSION_READY':
          console.info(
            this.logPrefix,
            `Current app version: ${evt.currentVersion.hash}`,
          );
          console.info(
            this.logPrefix,
            `New app version ready for use: ${evt.latestVersion.hash}`,
          );
          this.onVersionReady();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.info(
            this.logPrefix,
            `Failed to install app version '${evt.version.hash}': ${evt.error}`,
          );
          break;
        case 'NO_NEW_VERSION_DETECTED':
          console.info(this.logPrefix, `No new app version detected`);
          break;
      }
    });
    this.subscriptions.add(subscription);

    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable),
    );
    const every15Minutes$ = interval(0.25 * 60 * 60 * 1000);
    const every15MinutesOnceAppIsStable$ = concat(
      appIsStable$,
      every15Minutes$,
    );

    subscription = every15MinutesOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.info(
          this.logPrefix,
          updateFound
            ? 'A new version is available.'
            : 'Already on the latest version.',
        );
      } catch (err) {
        console.info(this.logPrefix, 'Failed to check for updates:', err);
      }
    });
    this.subscriptions.add(subscription);
  }

  teardown() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = undefined;
    }
  }

  private onVersionReady() {
    const dialog = document.getElementById('version-ready-dialog') as HTMLDialogElement;
    dialog?.showModal();
  }

  public async activateUpdate() {
    await this.updates.activateUpdate();
    window.location.reload();
  }
}
