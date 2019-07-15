import { TestBed } from '@angular/core/testing';

import { EditorBackgroundService } from './editor-background.service';

describe('EditorBackgroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorBackgroundService = TestBed.get(EditorBackgroundService);
    expect(service).toBeTruthy();
  });
});
