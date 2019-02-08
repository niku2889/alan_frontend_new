import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import { MenuItems } from '../../../Core/menu/menu-items/menu-items';

declare var $: any;

@Component({
   selector: 'HeaderOne',
   templateUrl: './HeaderOne.component.html',
   styleUrls: ['./HeaderOne.component.scss']
})
export class HeaderOneComponent implements OnInit {

   toggleActive: boolean = false;
   cartProducts: any;
   popupResponse: any;
   wishlistProducts: any;

   constructor(public embryoService: EmbryoService,
      private menuItems: MenuItems, private route: ActivatedRoute,
      private router: Router, ) {
   }

   ngOnInit() {
   }

   public toggleSearch() {
      $('app-main').toggleClass('form-open');
   }

   public toggleSidebar() {
      this.embryoService.sidenavOpen = !this.embryoService.sidenavOpen;
   }

}
