import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesPopoverPage } from './templates-popover.page';

describe('TemplatesPopoverPage', () => {
  let component: TemplatesPopoverPage;
  let fixture: ComponentFixture<TemplatesPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
