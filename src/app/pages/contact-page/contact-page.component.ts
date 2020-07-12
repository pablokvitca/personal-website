import { Component, OnInit } from '@angular/core';
import { ImageRef } from 'src/app/components/project-view/Project';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  public contact = {
    header: 'Contact Me',
    subheader: 'Please reach out to me about my resume, information, or with questions',
    social: [
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'github'],
          alt: 'GitHub Icon',
        },
        href: 'https://github.com/pablokvitca',
        text: 'GitHub'
      },
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'stack-overflow'],
          alt: 'Stackoverflow Icon',
        },
        href: 'https://stackoverflow.com/users/4860393/pablo-kvitca',
        text: 'StackOverflow'
      },
      {
        icon: {
          source: 'fontawesome',
          icon: ['fab', 'linkedin'],
          alt: 'LinkedIn Icon',
        },
        href: 'https://www.linkedin.com/in/pablokvitca/',
        text: 'LinkedIn'
      },
      {
        icon: {
          source: 'fontawesome',
          icon: ['fas', 'envelope-open-text'],
          alt: 'Envelope Open with Text',
        },
        href: 'mailto:kvitca.p@northeastern.edu',
        text: 'e-mail'
      }
    ]
  };

  public contactIllustration: ImageRef = {
    ref: 'assets/illustrations/undraw_conversation_h12g.svg'
  };

}
