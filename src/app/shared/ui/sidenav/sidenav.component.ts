import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';

type Menu = {
  title: string;
  items: MenuItem[];
};

export type MenuItem = {
  title: string;
  icon: string;
  link?: string;
  children?: MenuItem[];
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidenavItemComponent],
})
export class SidenavComponent {
  menu: Menu[] = [
    {
      title: 'MAIN',
      items: [
        {
          title: 'Dashboard',
          icon: 'dashboard',
          children: [
            {
              title: 'Title 1',
              icon: 'icon',
              link: '',
            },
            {
              title: 'Title 2',
              icon: 'icon',
              link: '',
            },
          ],
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: '/',
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
}
