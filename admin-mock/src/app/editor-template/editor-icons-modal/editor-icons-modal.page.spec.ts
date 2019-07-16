import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorIconsModalPage } from './editor-icons-modal.page';

describe('EditorIconsModalPage', () => {
  let component: EditorIconsModalPage;
  let fixture: ComponentFixture<EditorIconsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorIconsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorIconsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
