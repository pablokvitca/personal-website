import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { Project, ImageRef } from 'src/app/components/project-view/Project';
import { ContentfulService } from 'src/app/services/contentful.service';
import { Entry } from 'contentful';

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

  constructor(private contentfulService: ContentfulService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.contentfulService.getProjects().then((projects: Entry<any>[]) => {
        this.projects = projects.map((entry) => new Project(entry.fields));
        this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.detectChanges();
  }

}
