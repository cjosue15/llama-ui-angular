import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidenavComponent } from './shared/ui/sidenav/sidenav.component';
import { HeaderComponent } from './shared/ui/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'facturing';
}
