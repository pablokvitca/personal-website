import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { ContentfulService } from './services/contentful.service';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDesktop, faLaptop, faMobileAlt, faQuestionCircle, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {faAngular, faLinkedin, faGithub, faStackOverflow, } from '@fortawesome/free-brands-svg-icons';

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
    FontAwesomeModule
  ],
  providers: [
    ContentfulService
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
      faEnvelopeOpenText
    );
    faConfig.fallbackIcon = faQuestionCircle;
  }
}
