import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projects', redirectTo: ''},
  { path: 'contact-page', component: ContactPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

const routingOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
