import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBrandPage } from './sub-brand.page';

describe('SubBrandPage', () => {
  let component: SubBrandPage;
  let fixture: ComponentFixture<SubBrandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubBrandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBrandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
