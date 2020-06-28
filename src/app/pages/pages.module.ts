import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageComponent } from './home-page/home-page.component';
import { ComponentsModule } from '../components/components.module';
import { PageProjectsComponent } from './page-projects/page-projects.component';


@NgModule({
  declarations: [
    BasicPageComponent,
    PageNotFoundComponent,
    HomePageComponent,
    PageProjectsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    BasicPageComponent,
    PageNotFoundComponent,
    HomePageComponent
  ]
})
export class PagesModule { }
