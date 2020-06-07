import { Component, OnInit, Input } from '@angular/core';
import _ from "lodash";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  @Input()
  public project: any; //TODO: project

  @Input()
  public reverse: boolean = false;

  constructor() { }

  public get techicons(): any[] {
    return _.forEach(this.project.technologies, (tech) => {
      return {
        source: "fontawesome",
        icon: this.techToIcon(tech)
      }
    });
  }

  private techToIcon(name: string): any {
    return ""
  }

  ngOnInit(): void {
  }

}
