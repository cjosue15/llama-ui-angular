import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, inject, output } from '@angular/core';
import { sidenavAnimations } from '@shared/animations';

import { animations } from '@shared/animations/animations';
import { LayoutService } from '@shared/data-access/layout/layout.service';

@Component({
  selector: 'app-sidenav-brand',
  template: `
    <div class="sidenav__brand-title">
      <picture>
        <img
          ngSrc="assets/images/llama.png"
          width="42"
          height="64"
          alt="Llama UI" />
      </picture>
      <h1>Llama UI</h1>
    </div>
    <div class="sidenav__brand-chevron">
      <button [@sidenavChevron]="state" (click)="chevronClicked.emit()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="stroke-white">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </div>
  `,
  styleUrl: './sidenav-brand.component.scss',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  animations: [sidenavAnimations.sidenavChevron, animations.fadeOut],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'sidenav__brand',
  },
})
export class SidenavBrandComponent {
  private _layoutService = inject(LayoutService);

  get state() {
    return this._layoutService.sidenavState();
  }

  chevronClicked = output<void>();
}
