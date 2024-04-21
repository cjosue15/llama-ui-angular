import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations: {
  readonly fadeIn: AnimationTriggerMetadata;
  readonly fadeOut: AnimationTriggerMetadata;
} = {
  fadeIn: trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 })),
    ]),
  ]),
  fadeOut: trigger('fadeOut', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-out', style({ opacity: 0 })),
    ]),
  ]),
};
