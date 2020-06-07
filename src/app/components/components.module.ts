import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { IconComponent } from './icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectViewComponent } from './project-view/project-view.component';



@NgModule({
  declarations: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [
    TerminalComponent,
    NavbarComponent,
    ProfileComponent,
    IconComponent,
    ProjectViewComponent
  ]
})
export class ComponentsModule { }
