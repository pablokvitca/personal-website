import {Component, Input } from '@angular/core';
import {IconSpec} from '../icon/icon.component';

@Component({
  selector: 'app-home-page-social-link',
  templateUrl: './home-page-social-link.component.html',
  styleUrls: ['./home-page-social-link.component.scss']
})
export class HomePageSocialLinkComponent {

  @Input()
  icon: IconSpec;

  @Input()
  href: string;

}
