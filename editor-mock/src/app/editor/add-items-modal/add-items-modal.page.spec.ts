import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsModalPage } from './add-items-modal.page';

describe('AddItemsModalPage', () => {
  let component: AddItemsModalPage;
  let fixture: ComponentFixture<AddItemsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
