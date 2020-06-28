import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from './icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectImageComponent } from './project-image/project-image.component';
import { ProfileHeroComponent } from './profile-hero/profile-hero.component';
import { HomePageSocialLinkComponent } from './home-page-social-link/home-page-social-link.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent,
    ProjectImageComponent,
    ProfileHeroComponent,
    HomePageSocialLinkComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent,
    ProjectImageComponent,
    ProfileHeroComponent,
    HomePageSocialLinkComponent
  ]
})
export class ComponentsModule { }
