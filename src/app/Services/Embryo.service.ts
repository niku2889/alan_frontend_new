import { Injectable, Inject } from '@angular/core';

interface Response {
  data: any;
}

@Injectable()
export class EmbryoService {

  sidenavOpen: boolean = false;
  paymentSidenavOpen: boolean = false;
  isDirectionRtl: boolean = false;
  featuredProductsSelectedTab: any = 0;
  newArrivalSelectedTab: any = 0;


  localStorageCartProducts: any;
  localStorageWishlist: any;
  navbarCartCount: number = 0;
  navbarWishlistProdCount = 0;
  buyUserCartProducts: any;

  constructor(
    ) {
  }
}
