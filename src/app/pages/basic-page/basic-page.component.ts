import { Component, OnInit } from '@angular/core';
import { faGithub, faTwitter, faLinkedin, faStackOverflow } from "@fortawesome/free-brands-svg-icons"

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.scss']
})
export class BasicPageComponent implements OnInit {

  public iconGithub = faGithub;
  public iconTwitter = faTwitter;
  public iconLinkedIn = faLinkedin;
  public iconStackOverflow = faStackOverflow;

  constructor() { }

  ngOnInit() {
  }

}
