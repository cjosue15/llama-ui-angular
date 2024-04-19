import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () =>
      import(
        '@pages/dashboards/feature/dashboard-shell/dashboard-shell.routes'
      ),
  },
  {
    path: 'settings',
    loadChildren: () => import('@pages/settings/feature/settings-routes'),
  },
];
