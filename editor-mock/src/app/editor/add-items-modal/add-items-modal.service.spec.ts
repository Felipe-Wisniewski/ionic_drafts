import { TestBed } from '@angular/core/testing';

import { AddItemsModalService } from './add-items-modal.service';

describe('AddItemsModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddItemsModalService = TestBed.get(AddItemsModalService);
    expect(service).toBeTruthy();
  });
});
