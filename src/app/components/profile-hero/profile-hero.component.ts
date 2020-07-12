import {Component, Input, OnInit} from '@angular/core';
import {ImageRef} from '../project-view/Project';

@Component({
  selector: 'app-profile-hero',
  templateUrl: './profile-hero.component.html',
  styleUrls: ['./profile-hero.component.scss']
})
export class ProfileHeroComponent {

  @Input()
  profile: any;

}
