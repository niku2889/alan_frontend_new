import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
   MatFormFieldModule,
} from '@angular/material';
import { BarRatingModule } from "ngx-bar-rating";
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialShareComponent } from './SocialShare/SocialShare.component';
import { SocialShareProductComponent } from './SocialShareProduct/SocialShareProduct.component';
import { RatingComponent } from './Rating/Rating.component';
import { PageTitleComponent } from './PageTitle/PageTitle.component';
import { ContactFormComponent } from './ContactForm/ContactForm.component';
import { TeamComponent } from './Team/Team.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      MatFormFieldModule,
      BarRatingModule,
      FormsModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyC9PnuRk42kbCPMOvsfHpn40r5SoyN38zI',
         libraries: ['places']
      })
   ],
   declarations: [
      SocialShareComponent,
      RatingComponent,
      PageTitleComponent,
      ContactFormComponent,
      SocialShareProductComponent,
      TeamComponent
   ],
   exports: [
      SocialShareComponent,
      RatingComponent,
      PageTitleComponent,
      ContactFormComponent,
      SocialShareProductComponent,
      TeamComponent
   ],
   entryComponents: [
   ]
})
export class GlobalModule { }
