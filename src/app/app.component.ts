import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { version } from '../../package.json';
import { UpdaterService } from './services/updater.service';


@Component({
  selector: 'fo2app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  updater = inject(UpdaterService);

  appVersion = version;

  ngAfterViewInit(): void {
    this.updater.start();
  }




}

