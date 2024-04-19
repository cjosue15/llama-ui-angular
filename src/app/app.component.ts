import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

import { SidenavComponent } from './shared/ui/sidenav/sidenav.component';
import { HeaderComponent } from './shared/ui/header/header.component';
import { LayoutService } from '@shared/data-access/layout/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _layoutService = inject(LayoutService);

  get sidenavState() {
    return this._layoutService.sidenavState();
  }
}
