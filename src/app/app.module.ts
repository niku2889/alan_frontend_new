
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule, BrowserTransferStateModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule,
  MatChipsModule,
  MatSidenavModule,
  MatTabsModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { NguCarouselModule } from '@ngu/carousel';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BidiModule } from '@angular/cdk/bidi';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { GlobalModule } from './Global/Global.module';
import { MenuItems } from './Core/menu/menu-items/menu-items';
import { EmbryoService } from './Services/Embryo.service';

import { AppComponent } from './app.component';
import { MainComponent } from './Main/Main.component';
import { HeaderOneComponent } from './Layouts/Header/HeaderOne/HeaderOne.component';
import { FooterOneComponent } from './Layouts/Footer/FooterOne/FooterOne.component';
import { MenuComponent } from './Layouts/Menu/Menu/Menu.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { SideBarMenuComponent } from './Layouts/Menu/SidebarMenu/SidebarMenu.component';
import { HomeVehicleComponent } from './Pages/Vehicle/Home/Home.component';
import { BlogComponent } from './Pages/Blog/Blog.component';
import { BlogDetailsComponent } from './Pages/BlogDetails/Details.component';
import { SitemapComponent } from './Pages/Sitemap/sitemap.component';
import { PrivacyPolicyComponent } from './Pages/About/PrivacyPolicy/PrivacyPolicy.component';
import { AboutUsComponent } from './Pages/About/AboutUs/AboutUs.component';
import { TermAndConditionComponent } from './Pages/About/TermAndCondition/TermAndCondition.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'primeng/toast';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CarouselModule } from 'ngx-bootstrap/carousel';

/********** Custom option for ngx-translate ******/
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderOneComponent,
    FooterOneComponent,
    MenuComponent,
    SideBarMenuComponent,
    NotFoundComponent,
    HomeVehicleComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    TermAndConditionComponent,
    BlogComponent,
    BlogDetailsComponent,
    SitemapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    GlobalModule,
    MatButtonModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    MatSelectModule,
    MatTooltipModule,
    MatChipsModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    //NguCarouselModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    //LoadingBarRouterModule,
    //LoadingBarModule.forRoot(),
    //AngularFireModule.initializeApp(environment.firebase, 'embryo'),
    //AngularFirestoreModule,
    //AngularFireDatabaseModule,
    BidiModule,
    HttpModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [MenuItems,
    EmbryoService,
    Title,
    Meta],
  bootstrap: [AppComponent]
})

export class AppModule { }
