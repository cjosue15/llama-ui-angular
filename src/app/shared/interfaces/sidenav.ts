export type Menu = {
  title: string;
  items: MenuItem[];
};

export type MenuItem = {
  title: string;
  icon: string;
  link?: string;
  children?: MenuItem[];
};

export type SidenavState =
  | 'expanded'
  | 'collapsed'
  | 'hovered'
  | 'hidden'
  | 'visible';
