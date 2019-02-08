import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, finalize, tap } from 'rxjs/operators';
import { EmbryoService } from '../Services/Embryo.service';
import { MenuItems } from '../Core/menu/menu-items/menu-items';
import { TranslateService } from '@ngx-translate/core';

@Component({
   selector: 'app-main',
   templateUrl: './Main.component.html',
   styleUrls: ['./Main.component.scss']
})
export class MainComponent implements OnInit {
   timer = 0;
   isRtl: any;

   constructor(
      public embryoService: EmbryoService,
      public menuItems: MenuItems,
      public translate: TranslateService) {

      if (this.embryoService.isDirectionRtl) {
         this.isRtl = 'rtl';
      } else {
         this.isRtl = 'ltr';
      }
   }

   ngOnInit() {
   }

   public hideSideNav() {
      this.embryoService.sidenavOpen = false;
   }

   public changeDirection() {
      if (this.isRtl == "rtl") {
         this.isRtl = "ltr";
         this.embryoService.isDirectionRtl = false;
      } else {
         this.isRtl = "rtl"
         this.embryoService.isDirectionRtl = true;
      }

      this.embryoService.featuredProductsSelectedTab = 0;
      this.embryoService.newArrivalSelectedTab = 0;
   }

}
