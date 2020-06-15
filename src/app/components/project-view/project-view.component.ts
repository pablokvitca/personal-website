import { Component, OnInit, Input } from '@angular/core';
import _ from "lodash";
import { Project, TechnologyRef } from './Project';
import { IconSpec } from '../icon/icon.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  @Input()
  public project: Project;

  @Input()
  public reverse: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
