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
export class ProjectsPageComponent implements OnInit, AfterViewInit {

  private fragment: string = 'projectsList';

  public projects: Project[] = [];

  public loading: boolean = true;

  heroIllustration = {
    ref: 'assets/illustrations/undraw_dev_productivity_umsq.svg'
  }; // TODO: move to contentful?

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
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

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

}
