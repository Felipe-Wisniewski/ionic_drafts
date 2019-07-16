import { TestBed } from '@angular/core/testing';

import { EditorIconsModalService } from './editor-icons-modal.service';

describe('EditorIconsModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorIconsModalService = TestBed.get(EditorIconsModalService);
    expect(service).toBeTruthy();
  });
});
