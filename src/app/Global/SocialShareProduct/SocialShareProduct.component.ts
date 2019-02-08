import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'embryo-SocialShareProduct',
  templateUrl: './SocialShareProduct.component.html',
  styleUrls: ['./SocialShareProduct.component.scss']
})
export class SocialShareProductComponent implements OnInit {

  @Input() url : any;

  constructor() { }

  ngOnInit() {
  }

}
