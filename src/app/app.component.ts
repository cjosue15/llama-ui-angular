import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { SidenavComponent } from './shared/ui/sidenav/sidenav.component';
import { HeaderComponent } from './shared/ui/header/header.component';
import { LayoutService } from '@shared/data-access/layout/layout.service';

const MOBILE_BREAKPOINT = '(min-width: 991px)';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _layoutService = inject(LayoutService);

  private _breakpointObserver = inject(BreakpointObserver);

  get sidenavState() {
    return this._layoutService.sidenavState();
  }

  constructor() {
    this._breakpointObserver
      .observe([MOBILE_BREAKPOINT])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this._layoutService.set('isMobile', false);
          this._layoutService.toggleSidenav('expanded');
        } else {
          this._layoutService.set('isMobile', true);
          this._layoutService.toggleSidenav('hidden');
        }
      });
  }
}
