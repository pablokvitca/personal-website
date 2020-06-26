import {ApplicationRef, ChangeDetectorRef, Component, NgZone, OnChanges, OnInit} from '@angular/core';
import { Project, ImageRef } from 'src/app/components/project-view/Project';
import { ContentfulService } from 'src/app/services/contentful.service';
import { Entry } from 'contentful';
import * as _ from 'lodash';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public projects: Project[] = [];

  mainimg: ImageRef = {
    ref: 'assets/illustrations/undraw_dev_productivity_umsq.svg'
  }; // TODO: add to contentful?

  public loading: boolean = true;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit(): void {
      this.loadData().then(() => {
        this.loading = false;
      });
  }

  async loadData(): Promise<void> {
    const projectEntries = await this.contentfulService.getProjects();
    this.projects = _.map(projectEntries, (entry) => new Project(entry.fields));
  }

}
