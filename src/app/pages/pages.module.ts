import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [BasicPageComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    BasicPageComponent,
    PageNotFoundComponent
  ]
})
export class PagesModule { }
