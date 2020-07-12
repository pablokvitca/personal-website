import { Component, OnInit } from '@angular/core';
import {ImageRef} from '../../components/project-view/Project';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  public notFoundIllustraion: ImageRef = {
    ref: 'assets/illustrations/oops-404-error-with-a-broken-robot-animate.svg'
  };

}
