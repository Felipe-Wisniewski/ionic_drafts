import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBackgroundPopoverPage } from './editor-background-popover.page';

describe('EditorBackgroundPopoverPage', () => {
  let component: EditorBackgroundPopoverPage;
  let fixture: ComponentFixture<EditorBackgroundPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBackgroundPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBackgroundPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
