import { Component, ViewEncapsulation, inject } from '@angular/core';
import { LayoutService } from '@shared/data-access/layout/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  host: { class: 'header' },
})
export class HeaderComponent {
  private _layoutService = inject(LayoutService);

  get isMobile() {
    return this._layoutService.isMobile();
  }

  toggleSidenav(): void {
    this._layoutService.toggleSidenav('visible');
  }
}
