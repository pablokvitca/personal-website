import { Component, OnInit } from '@angular/core';
import { ImageRef } from 'src/app/components/project-view/Project';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  public profile = {
    social: [
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'github'],
          alt: 'GitHub Icon',
        },
        href: 'https://github.com/pablokvitca'
      },
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'stack-overflow'],
          alt: 'Stackoverflow Icon',
        },
        href: 'https://stackoverflow.com/users/4860393/pablo-kvitca'
      },
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'linkedin'],
          alt: 'LinkedIn Icon',
        },
        href: 'https://www.linkedin.com/in/pablokvitca/'
      }
    ]
  };

  public contactIllustration: ImageRef = {
    ref: 'assets/illustrations/undraw_conversation_h12g.svg'
  };

}
