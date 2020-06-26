import { Component, OnInit, Input } from '@angular/core';
import { Project } from './Project';
import {faExternalLinkAlt, faLevelUpAlt} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent {

  externalLinkIcon = {
    source: 'fontawesome',
    icon: faExternalLinkAlt,
    alt: 'Open',
    customClasses: 'font-light'
  };

  iconDeploymentRef = {
    source: 'fontawesome',
    icon: faLevelUpAlt,
    alt: 'Open',
    customClasses: 'font-light'
  };

  iconSourceRef = {
    source: 'fontawesome',
    icon: faGithub,
    alt: 'Open',
    customClasses: 'font-light'
  };

  @Input()
  public project: Project;

  @Input()
  public reverse = false;

}
