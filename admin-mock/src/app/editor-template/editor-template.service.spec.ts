import { TestBed } from '@angular/core/testing';

import { EditorTemplateService } from './editor-template.service';

describe('EditorTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorTemplateService = TestBed.get(EditorTemplateService);
    expect(service).toBeTruthy();
  });
});
