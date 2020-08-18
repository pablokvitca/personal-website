import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { Angulartics2Module } from 'angulartics2';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faDesktop, faLaptop, faMobileAlt, faQuestionCircle, faEnvelopeOpenText, faScroll} from '@fortawesome/free-solid-svg-icons';
import {faAngular, faLinkedin, faGithub, faStackOverflow, faSass} from '@fortawesome/free-brands-svg-icons';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PagesModule,
    FontAwesomeModule,
    MatSidenavModule,
    Angulartics2Module.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    library.addIcons(
      faLaptop,
      faMobileAlt,
      faDesktop,
      faQuestionCircle,
      faAngular,
      faGithub,
      faStackOverflow,
      faLinkedin,
      faEnvelopeOpenText,
      faSass,
      faScroll
    );
    faConfig.fallbackIcon = faQuestionCircle;
  }
}
