import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTemplatePage } from './editor-template.page';

describe('EditorTemplatePage', () => {
  let component: EditorTemplatePage;
  let fixture: ComponentFixture<EditorTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
