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
import {RouterModule} from '@angular/router';
import {Angulartics2Module} from 'angulartics2';
import { TopbarComponent } from './topbar/topbar.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent,
    ProjectImageComponent,
    ProfileHeroComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule,
    Angulartics2Module
  ],
  exports: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent,
    ProjectImageComponent,
    ProfileHeroComponent,
    TopbarComponent
  ]
})
export class ComponentsModule { }
