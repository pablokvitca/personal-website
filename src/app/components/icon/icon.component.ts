import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface IconSpec {
  source: 'fontawesome' | 'material';
  icon: IconDefinition | [string, string] | string;
  alt?: string; // TODO: 1. change to separate input; 2.display on hover
  customClasses?: any;
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  public icon: IconSpec;

  constructor() { }

  ngOnInit(): void {
  }

}
