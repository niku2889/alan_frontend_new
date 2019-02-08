import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItems } from '../../../Core/menu/menu-items/menu-items';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'FooterOne',
  templateUrl: './FooterOne.component.html',
  styleUrls: ['./FooterOne.component.scss']
})
export class FooterOneComponent implements OnInit {
  version:any;

  constructor(public menuItems: MenuItems,
    public translate: TranslateService) { }

  ngOnInit() {
    this.version = environment.version;
  }

}
