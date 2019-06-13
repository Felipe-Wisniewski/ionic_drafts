import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToolsPage } from './text-tools.page';

describe('TextToolsPage', () => {
  let component: TextToolsPage;
  let fixture: ComponentFixture<TextToolsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextToolsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
