import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureEditComponent } from './picture-edit.component';

describe('PictureEditComponent', () => {
  let component: PictureEditComponent;
  let fixture: ComponentFixture<PictureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
