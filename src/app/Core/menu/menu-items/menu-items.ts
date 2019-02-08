import { Injectable } from '@angular/core';

/*
 * Menu interface
 */
export interface Menu {
  state: string;
  name?: string;
  type?: string;
  icon?: string;
  children?: Menu[];
}

const HeaderOneItems = [
];

const FooterOneItems = [
  {
    state: '',
    name: "Navigation",
    type: "sub",
    icon: '',
    children: [
      {
        state: 'about',
        name: 'About Us',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'privacy-policy',
        name: 'Privacy Policy',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'term-condition',
        name: 'Cookies',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'blog',
        name: 'Blog',
        type: 'link',
        icon: 'arrow_right_alt',
      },
    ]
  }
]

@Injectable()
export class MenuItems {

  /*
   * Get all header menu
   */
  getMainMenu(): Menu[] {
    return HeaderOneItems;
  }

  /*
   * Get all footer menu
   */
  getFooterOneMenu(): Menu[] {
    return FooterOneItems;
  }
}
