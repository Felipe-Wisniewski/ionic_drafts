import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesPostsPage } from './templates-posts.page';

describe('TemplatesPostsPage', () => {
  let component: TemplatesPostsPage;
  let fixture: ComponentFixture<TemplatesPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
