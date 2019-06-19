import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextPage } from './add-text.page';

describe('AddTextPage', () => {
  let component: AddTextPage;
  let fixture: ComponentFixture<AddTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
