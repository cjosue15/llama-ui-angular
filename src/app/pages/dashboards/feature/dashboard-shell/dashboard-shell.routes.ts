import { Routes } from '@angular/router';

export default [
  {
    path: 'analytics',
    loadComponent: () =>
      import('../dashboard-analytics/dashboard-analytics.component'),
  },
  {
    path: 'ecommerce',
    loadComponent: () =>
      import('../dashboard-ecommerce/dashboard-ecommerce.component'),
  },
  {
    path: '**',
    redirectTo: 'analytics',
  },
] as Routes;
