import {Component, Input, OnInit} from '@angular/core';
import {ImageRef} from '../project-view/Project';

@Component({
  selector: 'app-profile-hero',
  templateUrl: './profile-hero.component.html',
  styleUrls: ['./profile-hero.component.scss']
})
export class ProfileHeroComponent {

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
  }; // TODO: add to contentful?

}
