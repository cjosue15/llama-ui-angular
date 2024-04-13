import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SIDENAV_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const sidenavAnimations: {
  readonly chevronRotate: AnimationTriggerMetadata;
  readonly menuExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  chevronRotate: trigger('chevronRotate', [
    state('collapsed, void', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(90deg)' })),
    transition(
      'expanded <=> collapsed, void => collapsed',
      animate(SIDENAV_ANIMATION_TIMING),
    ),
  ]),
  /** Animation that expands and collapses the panel content. */
  menuExpansion: trigger('menuExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    // Clear the `visibility` while open, otherwise the content will be visible when placed in
    // a parent that's `visibility: hidden`, because `visibility` doesn't apply to descendants
    // that have a `visibility` of their own (see #27436).
    state('expanded', style({ height: '*', visibility: '' })),
    transition(
      'expanded <=> collapsed, void => collapsed',
      animate(SIDENAV_ANIMATION_TIMING),
    ),
  ]),
};
