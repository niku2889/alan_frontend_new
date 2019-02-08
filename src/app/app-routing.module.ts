import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './Main/Main.component';
import { HomeVehicleComponent } from './Pages/Vehicle/Home/Home.component';
import { BlogComponent } from './Pages/Blog/Blog.component';
import { BlogDetailsComponent } from './Pages/BlogDetails/Details.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { PrivacyPolicyComponent } from './Pages/About/PrivacyPolicy/PrivacyPolicy.component';
import { AboutUsComponent } from './Pages/About/AboutUs/AboutUs.component';
import { TermAndConditionComponent } from './Pages/About/TermAndCondition/TermAndCondition.component';
import { SitemapComponent } from './Pages/Sitemap/sitemap.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeVehicleComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy',
          description: 'Privacy Policy - Compare the car part'
        }
      },
      {
        path: 'sitemap',
        component: SitemapComponent,
        data: {
          title: 'Sitemap',
          description: 'Sitemap - Compare the car part'
        }
      },
      {
        path: 'about',
        component: AboutUsComponent,
        data: {
          title: 'About',
          description: 'About - Compare the car part'
        }
      },
      {
        path: 'term-condition',
        component: TermAndConditionComponent,
        data: {
          title: 'Terms & Conditions',
          description: 'Terms & Conditions - Compare the car part'
        }
      },
      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'Blog',
          description: 'Blog - Compare the car part'
        }
      },
      {
        path: 'blog/:id',
        component: BlogDetailsComponent,
        data: {
          title: 'Blog Details',
          description: 'Blog Details - Compare the car part'
        }
      },
      {
        path: ':regno',
        component: HomeVehicleComponent,
      },
      {
        path: ':regno/:description',
        component: HomeVehicleComponent,
      },
      {
        path: ':regno/:description/:brand',
        component: HomeVehicleComponent,
      },
      {
        path: ':make/:model/:engine/:year',
        component: HomeVehicleComponent,
      },
      {
        path: ':make/:model/:engine/:year/:description',
        component: HomeVehicleComponent,
      },
      {
        path: ':make/:model/:engine/:year/:description/:brand/:articleNo',
        component: HomeVehicleComponent,
      }
    ]
  }, {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
