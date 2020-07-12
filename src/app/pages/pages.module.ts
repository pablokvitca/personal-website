import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '../components/components.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import {Angulartics2Module} from 'angulartics2';
import {ContentfulService} from '../services/contentful.service';


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
    FontAwesomeModule,
    Angulartics2Module
  ],
  exports: [
    PageNotFoundComponent,
    ContactPageComponent,
    AboutPageComponent,
    ProjectsPageComponent
  ],
  providers: [
    ContentfulService
  ],
})
export class PagesModule { }
