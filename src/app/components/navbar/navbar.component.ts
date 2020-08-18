import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private platform: Platform) {
  }

  @Input()
  sidenav: MatSidenav;

  public closeAction(): void {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }

  private isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

}
