import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  projects: any[] = [
    {
      "title": "Project A",
      "description": "Lorem ipsum dolor sit amet",
      "techs": ["Angular", "sass", "TypeScript"]
    },
    {
      "title": "Project B",
      "description": "Lorem ipsum dolor sit amet"
    },
    {
      "title": "Project C",
      "description": "Lorem ipsum dolor sit amet"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
