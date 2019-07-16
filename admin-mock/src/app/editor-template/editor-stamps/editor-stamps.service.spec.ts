import { TestBed } from '@angular/core/testing';

import { EditorStampsService } from './editor-stamps.service';

describe('EditorStampsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorStampsService = TestBed.get(EditorStampsService);
    expect(service).toBeTruthy();
  });
});
