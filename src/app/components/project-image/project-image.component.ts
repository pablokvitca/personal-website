import { Component, OnInit, Input } from '@angular/core';
import { ImageRef } from '../project-view/Project';

@Component({
  selector: 'app-project-image',
  templateUrl: './project-image.component.html',
  styleUrls: ['./project-image.component.scss']
})
export class ProjectImageComponent implements OnInit {

  @Input()
  image: ImageRef;

  constructor() { }

  ngOnInit(): void {
  }

}
