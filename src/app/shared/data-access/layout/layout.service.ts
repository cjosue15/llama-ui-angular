import { Injectable } from '@angular/core';

import { SidenavState } from '@shared/interfaces/sidenav';
import { SignalStore } from '../signal-store/signal-store.service';

export interface LayoutState {
  sidenav: SidenavState;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService extends SignalStore<LayoutState> {
  sidenavState = this.select('sidenav');

  constructor() {
    super({ sidenav: 'expanded' });
  }

  toggleSidenav(state: SidenavState) {
    this.set('sidenav', state);
  }
}
