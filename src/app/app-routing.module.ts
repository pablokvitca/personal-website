import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];

const routingOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
