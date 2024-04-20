import { Injectable } from '@angular/core';

import { SidenavState } from '@shared/interfaces/sidenav';
import { SignalStore } from '../signal-store/signal-store.service';

export interface LayoutState {
  sidenav: SidenavState;
  isMobile: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService extends SignalStore<LayoutState> {
  sidenavState = this.select('sidenav');

  isMobile = this.select('isMobile');

  constructor() {
    super({ sidenav: 'expanded', isMobile: false });
  }

  toggleSidenav(state: SidenavState) {
    this.set('sidenav', state);
  }
}
