import { Component, OnInit, Input } from '@angular/core';
import _ from "lodash";
import { Project } from './Project';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  externalLinkIcon = {
    source: 'fontawesome',
    icon: faExternalLinkAlt,
    alt: "Open",
    customClasses: "font-light"
  }

  @Input()
  public project: Project;

  @Input()
  public reverse: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
