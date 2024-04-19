import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgClass } from '@angular/common';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { sidenavAnimations } from '@shared/animations';
import { MenuItem } from '@shared/interfaces/sidenav';

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
  encapsulation: ViewEncapsulation.None,
})
export class SidenavItemComponent implements OnInit, OnDestroy {
  @Input()
  menuItem!: MenuItem;

  @HostBinding('class.llama-sidenav-item') readonly = true;

  state = signal('collapsed');

  childIsActive = signal(false);

  private router = inject(Router);

  private changeDetectorRef = inject(ChangeDetectorRef);

  private unsuscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntil(this.unsuscribe$)
      )
      .subscribe(value => {
        if (this.menuItem.children && this.menuItem.children.length > 0) {
          this.childIsActive.set(false);
          const urls = this.menuItem.children?.map(item => item.link) ?? [];
          if (urls.includes(value.url)) {
            console.log('isInChild');
            this.state.set('expanded');
            this.childIsActive.set(true);
            this.changeDetectorRef.markForCheck();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  toggleOpen(): void {
    if (!this.menuItem.children || this.menuItem.children.length === 0) return;
    this.state.set(this.state() === 'expanded' ? 'collapsed' : 'expanded');
    console.log(this.state());
  }
}
