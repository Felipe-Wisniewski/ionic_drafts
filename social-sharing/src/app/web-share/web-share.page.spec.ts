import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSharePage } from './web-share.page';

describe('WebSharePage', () => {
  let component: WebSharePage;
  let fixture: ComponentFixture<WebSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
