import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBackgroundPage } from './editor-background.page';

describe('EditorBackgroundPage', () => {
  let component: EditorBackgroundPage;
  let fixture: ComponentFixture<EditorBackgroundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBackgroundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBackgroundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
