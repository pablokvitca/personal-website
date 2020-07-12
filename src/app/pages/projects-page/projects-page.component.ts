import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Project} from '../../components/project-view/Project';
import {ContentfulService} from '../../services/contentful.service';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-projects',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  public content = {
    header: 'Projects',
    subheader: 'Look through my current and old projects!',
    lastUpdated: 'Last Updated: July 2020',
    heroIllustration: {
      ref: 'assets/illustrations/undraw_dev_productivity_umsq.svg'
    }
  };

  public projects: Project[] = [];

  public loading: boolean = true;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit(): void {
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  async loadData(): Promise<void> {
    const projectEntries = await this.contentfulService.getProjects();
    this.projects = _.reverse(
      _.sortBy(
        _.map(projectEntries, (entry) => new Project(entry.fields)),
        ['startDate']
      )
    );
  }
}
