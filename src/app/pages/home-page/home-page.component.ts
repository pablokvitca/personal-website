import { Component, OnInit } from '@angular/core';
import { Project, ImageRef } from 'src/app/components/project-view/Project';
import { faAngular, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt, faLaptop } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  projects: Project[] = [
    new Project(
      "Project A", // Name
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Phasellus ut tincidunt est. 
      Nunc molestie sollicitudin nulla, posuere laoreet enim ornare iaculis. 
      Duis erat erat, maximus sed dui eget, dignissim ullamcorper metus. 
      Praesent risus lacus, feugiat a purus at, interdum posuere leo. 
      Aliquam sit amet elit commodo lorem malesuada sagittis in dictum nibh. 
      Phasellus eu sapien eu urna tincidunt maximus a ac dolor. 
      Donec odio felis, molestie vitae vehicula quis, convallis sit amet diam. 
      Morbi eu volutpat justo. Aliquam gravida sapien eu libero fringilla gravida.`, // Description
      { // Source Reference
        title: "View Source",
        url: "https://example.com",
        available: true,
        icon: {
          source: "fontawesome",
          icon: faGithub
        }
      },
      { // Deployment Reference
        title: "View Live",
        url: "https://exmaple.org",
        available: true,
        icon: {
          source: "fontawesome",
          icon: faLaptop
        }
      },
      "January 2020", // Start date
      {
        name: "Active",
        customClasses: "bg-green-600"
      }, // Project Status
      {
        name: "Published",
        customClasses: "bg-green-600"
      }, // Project Release Status
      [{ ref: "assets/illustrations/undraw_programming_2svr.svg" }], // Project Images
      [], // Project Types
      [
        {
          technology: "Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faLaptop
          }
        },
        {
          technology: "Mobile Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faMobileAlt
          }
        }
      ], // Platforms
      [
        {
          technology: "Angular",
          version: "v9.1.9",
          icon: {
            source: "fontawesome",
            icon: faAngular,
            customClasses: "text-red-700 hover:text-red-800"
          }
        }
      ], // Technologies
    ),
    new Project(
      "Project B", // Name
      `Aenean at aliquet leo. 
      Sed ut ultricies risus. 
      Sed non consectetur lectus, iaculis imperdiet orci. 
      Suspendisse non efficitur ipsum. 
      In eleifend quis purus et tincidunt. 
      In leo nunc, lacinia ut nisl ac, ultrices tincidunt est.
      Pellentesque maximus enim quis eros laoreet, ut interdum felis ultricies.`, // Description
      { // Source Reference
        title: "GitHub",
        url: "https://example.com",
        available: true
      },
      { // Deployment Reference
        title: "Web",
        url: "https://exmaple.org",
        available: true
      },
      "January 2021", // Start date
      {
        name: "Active",
        customClasses: "bg-green-400"
      }, // Project Status
      {
        name: "Coming Soon",
        customClasses: "bg-yellow-500"
      }, // Project Release Status
      [{ ref: "assets/illustrations/undraw_programming_2svr.svg" }], // Project Images
      [], // Project Types
      [
        {
          technology: "Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fas", "laptop"]
          }
        },
        {
          technology: "Mobile Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fsa", "mobile-alt"]
          }
        }
      ], // Platforms
      [
        {
          technology: "Angular",
          version: "v9.1.9",
          icon: {
            source: "fontawesome",
            icon: faAngular,
          }
        }
      ], // Technologies
    ),
    new Project(
      "Project B", // Name
      `Aenean at aliquet leo. 
      Sed ut ultricies risus. 
      Sed non consectetur lectus, iaculis imperdiet orci. 
      Suspendisse non efficitur ipsum. 
      In eleifend quis purus et tincidunt. 
      In leo nunc, lacinia ut nisl ac, ultrices tincidunt est.
      Pellentesque maximus enim quis eros laoreet, ut interdum felis ultricies.`, // Description
      { // Source Reference
        title: "GitHub",
        url: "https://example.com",
        available: true
      },
      { // Deployment Reference
        title: "Web",
        url: "https://exmaple.org",
        available: true
      },
      "January 2021", // Start date
      {
        name: "Active",
        customClasses: "bg-green-400"
      }, // Project Status
      {
        name: "Coming Soon",
        customClasses: "bg-yellow-500"
      }, // Project Release Status
      [{ ref: "assets/illustrations/undraw_programming_2svr.svg" }], // Project Images
      [], // Project Types
      [
        {
          technology: "Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fas", "laptop"]
          }
        },
        {
          technology: "Mobile Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fsa", "mobile-alt"]
          }
        }
      ], // Platforms
      [
        {
          technology: "Angular",
          version: "v9.1.9",
          icon: {
            source: "fontawesome",
            icon: faAngular,
          }
        }
      ], // Technologies
    ),
    new Project(
      "Project B", // Name
      `Aenean at aliquet leo. 
      Sed ut ultricies risus. 
      Sed non consectetur lectus, iaculis imperdiet orci. 
      Suspendisse non efficitur ipsum. 
      In eleifend quis purus et tincidunt. 
      In leo nunc, lacinia ut nisl ac, ultrices tincidunt est.
      Pellentesque maximus enim quis eros laoreet, ut interdum felis ultricies.`, // Description
      { // Source Reference
        title: "GitHub",
        url: "https://example.com",
        available: true
      },
      { // Deployment Reference
        title: "Web",
        url: "https://exmaple.org",
        available: true
      },
      "January 2021", // Start date
      {
        name: "Active",
        customClasses: "bg-green-400"
      }, // Project Status
      {
        name: "Coming Soon",
        customClasses: "bg-yellow-500"
      }, // Project Release Status
      [{ ref: "assets/illustrations/undraw_programming_2svr.svg" }], // Project Images
      [], // Project Types
      [
        {
          technology: "Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fas", "laptop"]
          }
        },
        {
          technology: "Mobile Web",
          version: "All",
          icon: {
            source: "fontawesome",
            icon: faAngular//["fsa", "mobile-alt"]
          }
        }
      ], // Platforms
      [
        {
          technology: "Angular",
          version: "v9.1.9",
          icon: {
            source: "fontawesome",
            icon: faAngular,
          }
        }
      ], // Technologies
    ),
  ];

  mainimg: ImageRef = {
    ref: 'assets/illustrations/undraw_dev_productivity_umsq.svg'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
