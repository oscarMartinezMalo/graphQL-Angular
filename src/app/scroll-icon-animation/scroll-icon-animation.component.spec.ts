import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollIconAnimationComponent } from './scroll-icon-animation.component';

describe('ScrollIconAnimationComponent', () => {
  let component: ScrollIconAnimationComponent;
  let fixture: ComponentFixture<ScrollIconAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollIconAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollIconAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
