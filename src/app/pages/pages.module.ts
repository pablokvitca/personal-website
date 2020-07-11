import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '../components/components.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    ContactPageComponent,
    AboutPageComponent,
    ProjectsPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    PageNotFoundComponent,
    ContactPageComponent,
    AboutPageComponent,
    ProjectsPageComponent
  ]
})
export class PagesModule { }
