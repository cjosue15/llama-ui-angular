import { Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

import { MenuItem } from '../sidenav.component';
import { sidenavAnimations } from '../sidenav.animations';

@Component({
  selector: 'li[app-sidenav-item]',
  templateUrl: './sidenav-item.component.html',
  styleUrl: './sidenav-item.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  animations: [
    sidenavAnimations.menuExpansion,
    sidenavAnimations.chevronRotate,
  ],
})
export class SidenavItemComponent {
  @Input() menuItem!: MenuItem;

  state = signal('collapsed');

  toggleOpen(): void {
    if (!this.menuItem.children || this.menuItem.children.length === 0) return;
    this.state.set(this.state() === 'expanded' ? 'collapsed' : 'expanded');
    console.log(this.state());
  }
}
