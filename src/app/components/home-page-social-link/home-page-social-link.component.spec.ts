import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSocialLinkComponent } from './home-page-social-link.component';

describe('HomePageSocialLinkComponent', () => {
  let component: HomePageSocialLinkComponent;
  let fixture: ComponentFixture<HomePageSocialLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageSocialLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSocialLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
