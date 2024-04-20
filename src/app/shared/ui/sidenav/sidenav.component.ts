import { Component, ViewEncapsulation, inject, effect } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { sidenavAnimations } from '@shared/animations';
import { Menu } from '@shared/interfaces/sidenav';
import { LayoutService } from '@shared/data-access/layout/layout.service';

import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidenavBrandComponent } from './sidenav-brand/sidenav-brand.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SidenavItemComponent,
    SidenavBrandComponent,
    NgClass,
    NgOptimizedImage,
  ],
  animations: [sidenavAnimations.sidenavChevron],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'sidenav',
    '[class.sidenav--collapsed]': 'state === "collapsed"',
    '[class.sidenav--expanded]': 'state === "expanded" || state === "visible"',
    '[class.sidenav--hovered]': 'state === "hovered"',
    '[class.sidenav--hidden]': 'state === "hidden"',
    '[class.sidenav--visible]': 'state === "visible"',
  },
})
export class SidenavComponent {
  menu: Menu[] = [
    {
      title: 'MAIN',
      items: [
        {
          title: 'Dashboards',
          icon: 'dashboard',
          children: [
            {
              title: 'Analytics',
              icon: 'icon',
              link: '/dashboards/analytics',
            },
            {
              title: 'eCommerce',
              icon: 'icon',
              link: '/dashboards/ecommerce',
            },
          ],
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings',
        },
      ],
    },
    {
      title: 'APPS & PAGES',
      items: [
        {
          title: 'Email',
          icon: 'email',
          children: [
            {
              title: 'Inbox',
              icon: 'inbox',
              link: '/email/inbox',
            },
          ],
        },
        {
          title: 'Calendar',
          icon: 'calendar_today',
          link: '/calendar',
        },
        {
          title: 'Chat',
          icon: 'chat',
          link: '/chat',
        },
        {
          title: 'Contacts',
          icon: 'contacts',
          link: '/contacts',
        },
        {
          title: 'File Manager',
          icon: 'folder',
          link: '/file-manager',
        },
        {
          title: 'Projects',
          icon: 'work',
          link: '/projects',
        },
        {
          title: 'Tasks',
          icon: 'assignment',
          link: '/tasks',
        },
        {
          title: 'Invoices',
          icon: 'receipt',
          link: '/invoices',
        },
        {
          title: 'Orders',
          icon: 'shopping_cart',
          link: '/orders',
        },
        {
          title: 'Customers',
          icon: 'people',
          link: '/customers',
        },
        {
          title: 'Products',
          icon: 'shopping_bag',
          link: '/products',
        },
        {
          title: 'Blog',
          icon: 'article',
          link: '/blog',
        },
        {
          title: 'Pricing',
          icon: 'credit_card',
          link: '/pricing',
        },
        {
          title: 'Auth',
          icon: 'security',
          link: '/auth',
        },
      ],
    },
    {
      title: 'ADMIN PAGES',
      items: [
        {
          title: 'Users',
          icon: 'people',
          link: '/users',
        },
        {
          title: 'Roles',
          icon: 'people',
          link: '/roles',
        },
        {
          title: 'Permissions',
          icon: 'people',
          link: '/permissions',
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/settings',
        },
      ],
    },
  ];

  get state() {
    return this._layoutService.sidenavState();
  }

  overlayInit = effect(() => {
    if (this.state === 'visible') {
      this._createOverlay();
    } else {
      this._removeOverlay();
    }
  });

  private _layoutService = inject(LayoutService);

  private _overlay: HTMLDivElement | null = null;

  private _overlayFn: () => void = () => {};

  mouseOver() {
    if (this._layoutService.sidenavState() !== 'collapsed') return;

    this._layoutService.toggleSidenav('hovered');
  }

  mouseLeave() {
    if (this._layoutService.sidenavState() !== 'hovered') return;

    this._layoutService.toggleSidenav('collapsed');
  }

  toggleSidenav() {
    const state = this._layoutService.sidenavState();

    // if (state === 'hovered') return;

    if (state === 'visible') {
      this._layoutService.toggleSidenav('hidden');
      return;
    }

    const newState = this.state === 'expanded' ? 'collapsed' : 'expanded';
    this._layoutService.toggleSidenav(newState);
  }

  private _createOverlay() {
    this._overlay = document.createElement('div');
    document.body.style.overflow = 'hidden';
    this._overlay.classList.add('sidenav-overlay');
    this._overlayFn = () => {
      this._layoutService.toggleSidenav('hidden');
    };
    this._overlay.addEventListener('click', this._overlayFn);
    document.body.appendChild(this._overlay);
  }

  private _removeOverlay() {
    if (this._overlay) {
      document.body.style.overflow = '';
      this._overlay.removeEventListener('click', this._overlayFn);
      this._overlayFn = () => {};
      this._overlay.remove();
      this._overlay = null;
    }
  }
}
