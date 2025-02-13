import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fo2tools-animated-image-ag-grid-cell-renderer',
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pixelart"
         style="width: 64px; height: 96px; background-position: 50% 40%; background-repeat: no-repeat; background-size: 300% 400%;"
         [style.background-image]="imageBypass(value())">
    </div>
  `,
  styles: `
    .pixelart {
      animation: spriteMoveOnX 1s step-end infinite; image-rendering: pixelated;
    }
    @keyframes spriteMoveOnX {
      0% {
        background-position-x: 50%;
      }
      25% {
        background-position-x: 100%;
      }
      50% {
        background-position-x: 50%;
      }
      75% {
        background-position-x: 0;
      }
      100% {
        background-position-x: 50%;
      }
    }
  `
})
export class AnimatedImageAgGridCellRendererComponent implements ICellRendererAngularComp {
  sanitizer = inject(DomSanitizer);
  value = signal('');

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.value.set(params.value);
    return true;
  }

  imageBypass(s: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${s})`);
  }
}
