import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit} from '@angular/core';
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

  constructor(private contentfulService: ContentfulService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading = true;
    this.contentfulService.getProjects().then((projects: Entry<any>[]) => {
        this.projects = _.map(projects, (entry) => new Project(entry.fields));
    }).then(() => {
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    });
  }

}
