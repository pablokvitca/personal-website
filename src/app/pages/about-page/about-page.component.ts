import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {

  public profile = {
    name: 'Pablo Kvitca',
    title: 'Computer Scientist, Student, and Human.',
    subtitle: 'Interested on Artificial Intelligence (and Ethics), Data Science, Software Development and others.',
    image: {
      ref: 'assets/illustrations/undraw_Hello_qnas.svg'
    },
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
        text: 'Linkedin'
      }
    ]
  }; // TODO: add to contentful?

}
