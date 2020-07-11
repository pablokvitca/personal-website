import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {ProjectsPageComponent} from './pages/projects-page/projects-page.component';


const routes: Routes = [
  { path: 'about', component: AboutPageComponent},
  { path: 'projects', component: ProjectsPageComponent},
  { path: 'contact', component: ContactPageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'about' },
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
